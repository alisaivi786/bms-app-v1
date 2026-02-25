import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import HeicConverter from 'react-native-heic-converter';
import { Asset } from 'react-native-image-picker';
import ImageResizerImport from '@bam.tech/react-native-image-resizer';
import { logger } from '@devkit/utilities';
import type { ConvertImageFormat, UploadFileInputProps } from './UploadFileInput';

const ImageResizer = ImageResizerImport?.default ?? ImageResizerImport;

export type ImageProcessConfig = NonNullable<UploadFileInputProps<object>['imageProcessingOptions']>;

const ALL_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif']);

const BYTES_IN_MEGABYTE = 1024 * 1024;

export function getExt(name?: string) {
	const m = name?.toLowerCase().match(/\.([a-z0-9]+)$/);

	return m?.[1];
}

export function isSupportedImageType(params: Asset, mimeTypes: string[] = []) {
	const t = params.type?.toLowerCase();

	if (!ALL_IMAGE_MIME_TYPES.has(t ?? '')) {
		logger.warn(
			`Unsupported image mime type: ${t ?? 'undefined'}. Supported types are: ${Array.from(ALL_IMAGE_MIME_TYPES).join(
				', '
			)}`
		);
	}

	return t && mimeTypes.includes(t);
}

export function isHeic(params: { type?: string; fileName?: string }) {
	const t = params.type?.toLowerCase();
	const ext = getExt(params.fileName);

	return t === 'image/heic' || t === 'image/heif' || ext === 'heic' || ext === 'heif';
}

function isJpeg(params: { type?: string; fileName?: string }) {
	const t = params.type?.toLowerCase();
	const ext = getExt(params.fileName);

	return t === 'image/jpeg' || t === 'image/jpg' || ext === 'jpg' || ext === 'jpeg';
}

function isPng(params: { type?: string; fileName?: string }) {
	const t = params.type?.toLowerCase();
	const ext = getExt(params.fileName);

	return t === 'image/png' || ext === 'png';
}

function mimeTypeForFormat(format: ConvertImageFormat) {
	switch (format) {
		case 'PNG':
			return 'image/png' as const;
		case 'JPEG':
		default:
			return 'image/jpeg' as const;
	}
}

function mapMimeTypeToFormat(format?: string) {
	switch (format) {
		case 'image/png':
			return 'PNG';
		case 'JPEG':
		default:
			return 'JPEG';
	}
}

function fileNameForFormat(fileName: string | undefined, format: ConvertImageFormat) {
	switch (format) {
		case 'PNG':
			return withImageExtension(fileName, 'PNG');
		case 'JPEG':
		default:
			return withImageExtension(fileName, 'JPEG');
	}
}

async function fileSizeBytes(uri: string) {
	const path = uri.startsWith('file://') ? uri.replace('file://', '') : uri;
	const st = await RNFS.stat(path);

	return Number(st.size);
}

function toPositiveFiniteNumber(value: number | undefined | null) {
	if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return undefined;

	return value;
}

function toNonNegativeInt(value: number | undefined | null, fallback: number) {
	if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
	const intValue = Math.floor(value);

	return intValue < 0 ? fallback : intValue;
}

function clampQuality(value: number | undefined | null, fallback: number) {
	const q = toNonNegativeInt(value, fallback);

	return Math.min(100, Math.max(1, q));
}

function mbToBytes(value: number | undefined | null) {
	const mb = toPositiveFiniteNumber(value);

	if (mb === undefined) return undefined;

	return Math.round(mb * BYTES_IN_MEGABYTE);
}

function fitIntoMax(w: number, h: number, maxW: number, maxH: number) {
	const r = Math.min(maxW / w, maxH / h, 1);

	return { w: Math.round(w * r), h: Math.round(h * r) };
}

async function ensureNotHeicFormatOrConvertToJPEG(inputUri: string, params: { type?: string; fileName?: string }) {
	if (!isHeic(params)) return inputUri;

	if (Platform.OS === 'android') {
		logger.warn('HEIC conversion is not supported on Android natively.');

		return inputUri;
	}

	if (Platform.OS === 'ios') {
		const res = await HeicConverter.convert({ path: inputUri });
		const out = typeof res === 'string' ? res : res?.path;

		return out ?? inputUri;
	}

	return inputUri;
}

export async function convertNativeImageToFormat(
	asset: Asset,
	format: ConvertImageFormat,
	quality = 100
): Promise<Asset> {
	if (!asset.uri) throw new Error('INVALID_ASSET_URI');

	if (asset.type && !asset.type.toLowerCase().startsWith('image/')) return asset;

	const params = { type: asset.type, fileName: asset.fileName };

	const alreadyInFormat =
		(format === 'JPEG' && isJpeg(params) && !isHeic(params)) || (format === 'PNG' && isPng(params));

	if (alreadyInFormat) return asset;

	const jpegSourceUri = await ensureNotHeicFormatOrConvertToJPEG(asset.uri, params);

	if (format === 'JPEG' && isHeic(params)) {
		if (jpegSourceUri === asset.uri) return asset;

		return {
			...asset,
			uri: jpegSourceUri,
			type: 'image/jpeg',
			fileName: withImageExtension(asset.fileName, 'JPEG'),
			fileSize: await fileSizeBytes(jpegSourceUri),
		};
	}

	const width = asset.width;
	const height = asset.height;

	if (typeof width !== 'number' || typeof height !== 'number') return asset;

	const converted = await ImageResizer.createResizedImage(jpegSourceUri, width, height, format, quality, 0);
	const fileSize = await fileSizeBytes(converted.uri);

	return {
		...asset,
		uri: converted.uri,
		type: mimeTypeForFormat(format),
		fileName: fileNameForFormat(asset.fileName, format),
		fileSize,
		width: converted.width,
		height: converted.height,
	};
}

export async function resizeNativeImageDimensions(
	asset: Asset,
	options: Pick<ImageProcessConfig, 'maxWidthOrHeight'> = {}
): Promise<Asset> {
	if (!asset.uri) throw new Error('INVALID_ASSET_URI');

	const maxWidthOrHeight = toPositiveFiniteNumber(options.maxWidthOrHeight);

	if (maxWidthOrHeight === undefined) return asset;

	const width = asset.width;
	const height = asset.height;

	if (typeof width !== 'number' || typeof height !== 'number') return asset;

	const { w, h } = fitIntoMax(width, height, maxWidthOrHeight, maxWidthOrHeight);

	if (w === width && h === height) return asset;

	const params = { type: asset.type, fileName: asset.fileName };

	let format: ConvertImageFormat = 'JPEG';

	if (isPng(params)) format = 'PNG';
	else format = 'JPEG';

	const sourceUri = await ensureNotHeicFormatOrConvertToJPEG(asset.uri, params);

	const resized = await ImageResizer.createResizedImage(sourceUri, w, h, format, 100, 0);
	const fileSize = await fileSizeBytes(resized.uri);

	return {
		...asset,
		uri: resized.uri,
		type: mimeTypeForFormat(format),
		fileName: fileNameForFormat(asset.fileName, format),
		fileSize,
		width: resized.width,
		height: resized.height,
	};
}

export async function compressJpegToMaxSizeInMb(
	asset: Asset,
	options: Pick<ImageProcessConfig, 'maxSizeInMb' | 'initialQuality' | 'maxIterations'> = {}
): Promise<Asset> {
	if (!asset.uri) throw new Error('INVALID_ASSET_URI');

	const targetBytes = mbToBytes(options.maxSizeInMb);

	if (targetBytes === undefined) return asset;

	const width = asset.width;
	const height = asset.height;

	if (typeof width !== 'number' || typeof height !== 'number') return asset;

	const currentSize = typeof asset.fileSize === 'number' ? asset.fileSize : await fileSizeBytes(asset.uri);

	if (Number.isFinite(currentSize) && currentSize <= targetBytes) return asset;

	const initialQuality = clampQuality(options.initialQuality, 85);
	const minQuality = 20;
	const maxIterations = toNonNegativeInt(options.maxIterations, 6);

	let best = await ImageResizer.createResizedImage(
		asset.uri,
		width,
		height,
		mapMimeTypeToFormat(asset.type),
		initialQuality,
		0
	);
	let bestSize = await fileSizeBytes(best.uri);

	if (bestSize <= targetBytes) {
		return {
			...asset,
			uri: best.uri,
			type: 'image/jpeg',
			fileName: withImageExtension(asset.fileName, 'JPEG'),
			fileSize: bestSize,
			width: best.width,
			height: best.height,
		};
	}

	let lo = minQuality;
	let hi = Math.max(minQuality, initialQuality - 1);
	let smallest = await ImageResizer.createResizedImage(
		asset.uri,
		width,
		height,
		mapMimeTypeToFormat(asset.type),
		minQuality,
		0
	);
	let smallestSize = await fileSizeBytes(smallest.uri);

	for (let i = 0; i < maxIterations && lo <= hi; i++) {
		const mid = Math.floor((lo + hi) / 2);

		const cand = await ImageResizer.createResizedImage(
			asset.uri,
			width,
			height,
			mapMimeTypeToFormat(asset.type),
			mid,
			0
		);
		const size = await fileSizeBytes(cand.uri);

		if (size < smallestSize) {
			smallest = cand;
			smallestSize = size;
		}

		if (size <= targetBytes) {
			best = cand;
			bestSize = size;
			lo = mid + 1;
		} else {
			hi = mid - 1;
		}
	}

	const finalCandidate = bestSize <= targetBytes ? best : smallest;
	const finalSize = bestSize <= targetBytes ? bestSize : smallestSize;

	return {
		...asset,
		uri: finalCandidate.uri,
		type: 'image/jpeg',
		fileName: withImageExtension(asset.fileName, 'JPEG'),
		fileSize: finalSize,
		width: finalCandidate.width,
		height: finalCandidate.height,
	};
}

const IMAGE_EXT_REGEX = /\.(heic|heif|png|jpg|jpeg)$/i;

export function withImageExtension(fileName: string | undefined, format: ConvertImageFormat): string {
	const base = fileName?.replace(IMAGE_EXT_REGEX, '') ?? 'image';

	switch (format) {
		case 'PNG':
			return `${base}.png`;
		case 'JPEG':
		default:
			return `${base}.jpg`;
	}
}
