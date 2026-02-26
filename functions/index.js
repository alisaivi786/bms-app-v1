const {onCall, HttpsError} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Deletes known user subcollections in small batches.
 * @param {string} uid
 * @return {Promise<void>}
 */
async function deleteKnownSubcollections(uid) {
  const db = admin.firestore();
  const subcollections = ["incomes", "budgets", "emis"];

  for (const name of subcollections) {
    const colRef = db.collection("users").doc(uid).collection(name);
    let hasMore = true;
    while (hasMore) {
      const snapshot = await colRef.limit(400).get();
      if (snapshot.empty) {
        hasMore = false;
        continue;
      }
      const batch = db.batch();
      snapshot.docs.forEach((row) => batch.delete(row.ref));
      await batch.commit();
    }
  }
}

/**
 * Admin-only callable to delete a user from Auth + Firestore.
 */
exports.deleteUserByUid = onCall(async (request) => {
  if (!request.auth || !request.auth.uid) {
    throw new HttpsError("unauthenticated", "Sign in is required.");
  }

  const requesterUid = request.auth.uid;
  const rawTargetUid =
    request.data && request.data.uid ? request.data.uid : "";
  const targetUid = String(rawTargetUid).trim();
  if (!targetUid) {
    throw new HttpsError("invalid-argument", "uid is required.");
  }
  if (targetUid === requesterUid) {
    throw new HttpsError(
        "failed-precondition",
        "Admin cannot delete own account from this screen.",
    );
  }

  const db = admin.firestore();
  const requesterSnap = await db.collection("users").doc(requesterUid).get();
  const requesterData = requesterSnap.exists ? requesterSnap.data() : {};
  const isAdmin =
    Boolean(requesterData && requesterData.isAdmin) ||
    String((requesterData && requesterData.role) || "")
        .toLowerCase() === "admin";
  if (!isAdmin) {
    throw new HttpsError(
        "permission-denied",
        "Only admin users can delete users.",
    );
  }

  const targetRef = db.collection("users").doc(targetUid);
  const targetSnap = await targetRef.get();
  if (targetSnap.exists) {
    const targetData = targetSnap.data() || {};
    const targetIsAdmin =
      Boolean(targetData.isAdmin) ||
      String(targetData.role || "").toLowerCase() === "admin";
    if (targetIsAdmin) {
      throw new HttpsError(
          "permission-denied",
          "Admin users cannot be deleted from this screen.",
      );
    }
  }

  try {
    await deleteKnownSubcollections(targetUid);
  } catch (err) {
    logger.error("Subcollection delete failed", {
      requesterUid,
      targetUid,
      error: err && err.message ? err.message : String(err),
    });
    throw new HttpsError(
        "internal",
        `Firestore cleanup failed: ${
        err && err.message ? err.message : "unknown error"
        }`,
    );
  }

  try {
    await targetRef.delete().catch(() => undefined);
  } catch (err) {
    logger.error("User doc delete failed", {
      requesterUid,
      targetUid,
      error: err && err.message ? err.message : String(err),
    });
    throw new HttpsError(
        "internal",
        `User document delete failed: ${
        err && err.message ? err.message : "unknown error"
        }`,
    );
  }

  try {
    await admin.auth().deleteUser(targetUid);
  } catch (err) {
    if (!err || err.code !== "auth/user-not-found") {
      logger.error("Auth delete failed", {
        requesterUid,
        targetUid,
        error: err && err.message ? err.message : String(err),
        code: err && err.code ? err.code : "",
      });
      throw new HttpsError(
          "internal",
          `Authentication delete failed: ${
          err && err.message ? err.message : "unknown error"
          }`,
      );
    }
  }

  return {ok: true};
});
