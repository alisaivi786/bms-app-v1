'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { isSafari, isIOS } from 'react-device-detect';
import { CaptureIcon, FileIcon, FlashIcon, FlashOffIcon, ImgIcon } from '@devkit/icons/web';
import { getNow, logger } from '@devkit/utilities';
import { Button } from '../../Buttons';
import { useUploadInputContext } from './upload-input-context';

export const Camera = ({ onSuccess, id }: { onSuccess: (file: File) => void; id: string | undefined }) => {
	const cameraRef = useRef<Webcam>(null);
	const onToggleTorchState = useRef<((currentState: boolean) => void) | null>(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [isCameraPermissionDenied, setIsCameraPermissionDenied] = useState(false);
	const [torchIsOn, setTorchIsOn] = useState(false);
	const [hasTorch, setHasTorch] = useState(false);
	const { label, messages, cameraFileIcon: Icon } = useUploadInputContext();

	const ratio = useMemo(() => {
		return typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1;
	}, [typeof window]);

	const checkPermission = async () => {
		try {
			const cameraDevices = (await navigator.mediaDevices.enumerateDevices()).filter(
				(device) => device.kind === 'videoinput' && device.deviceId && device.label
			);

			if (cameraDevices.length > 0) {
				setHasCameraPermission(true);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (ex: any) {
			if ('message' in ex) logger.log(`Error ${ex?.message}`);
		}
	};

	const askForCameraPermission = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					//  facingMode: { ideal: 'environment' },
					aspectRatio: ratio,
				},
			})
			.then(function (stream) {
				stream.getTracks().forEach(function (track) {
					track.stop();
				});
				checkPermission();
			})
			.catch(function (error) {
				const { name } = error;

				if (name === 'NotAllowedError') setIsCameraPermissionDenied(true);
			});
	};

	const takePhoto = async () => {
		const photoUrl = cameraRef.current?.getScreenshot();
		const fileName = `${getNow().getTime()}.jpeg`;

		if (photoUrl) {
			const photoBlob = await (await fetch(photoUrl)).blob();
			const file = new File([photoBlob], fileName);

			onSuccess && onSuccess(file);
		}
	};

	useEffect(() => {
		checkPermission();

		return () => {
			if (cameraRef.current?.stream) {
				cameraRef.current.stream.getTracks().forEach(function (track) {
					track.stop();
				});
			}
		};
	}, []);

	// iOS 26 Safari bug workaround: Fix body position for fullScreen modals
	useEffect(() => {
		if (!isSafari || !isIOS) return;

		const originalPosition = document.body.style.position;

		document.body.style.position = 'fixed';

		return () => {
			document.body.style.position = originalPosition;
		};
	}, []);

	const onFlashClick = () => {
		if (hasTorch && onToggleTorchState.current) {
			onToggleTorchState.current(torchIsOn);
		}
	};

	// temporarily use custom color
	return (
		<div className="flex h-full max-h-full flex-col bg-[#2E313E] justify-between flex-1">
			{hasCameraPermission && (
				<Webcam
					className="flex-1"
					audio={false}
					disablePictureInPicture={true}
					onUserMedia={(stream) => {
						const track = stream.getVideoTracks()[0];

						if (track) {
							const capabilities = track.getCapabilities();

							if ('torch' in capabilities) {
								setHasTorch(true);
								const trackSettings = track.getSettings();

								if ('torch' in trackSettings) {
									setTorchIsOn(trackSettings.torch as boolean);

									onToggleTorchState.current = (currentState: boolean) => {
										track.applyConstraints({
											advanced: [{ torch: !currentState } as MediaTrackConstraintSet],
										});
										setTorchIsOn(!currentState);
									};
								}
							}
						}
					}}
					ref={cameraRef}
					screenshotFormat="image/jpeg"
					videoConstraints={{
						facingMode: { ideal: 'environment' },
						aspectRatio: ratio,
					}}
				></Webcam>
			)}

			{!hasCameraPermission && (
				<div className="flex h-full items-center justify-center">
					<div className="text-white text-center  p-6 ">
						<div>
							<label>{messages.useCamera ?? ''}</label>
						</div>
						<label>{messages.cameraPermissions ?? ''}</label>
						{isCameraPermissionDenied && <label>{messages.permissionDenied}</label>}
						<div className="flex justify-center py-3">
							<Button
								variant="secondary"
								onClick={() => {
									askForCameraPermission();
								}}
							>
								{messages.allowAccess}
							</Button>
						</div>
					</div>
				</div>
			)}

			<div className=" bg-[#2E313E] py-5">
				{label && (
					<div className="flex p-6 flex-row items-center gap-x-4">
						<div className="flex bg-white w-20 h-20 rounded-md items-center justify-center">
							{Icon ? typeof Icon === 'string' ? <img src={Icon} /> : <Icon /> : <FileIcon fontSize={35} />}
						</div>
						<div>
							<label className="text-white ">{label}</label>
						</div>
					</div>
				)}

				{hasCameraPermission && (
					<div className="flex flex-row items-center justify-between p-6">
						<div>
							<label htmlFor={id ?? 'upload_file'}>
								<ImgIcon className="text-white w-10 h-10" />
							</label>
						</div>
						<div>
							<CaptureIcon
								className="text-white w-14 h-14"
								onClick={() => {
									takePhoto();
								}}
							/>
						</div>
						<div>
							{torchIsOn ? (
								<FlashOffIcon className="text-white w-6 h-6" onClick={onFlashClick} />
							) : (
								<FlashIcon className="text-white w-6 h-6" onClick={onFlashClick} />
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
