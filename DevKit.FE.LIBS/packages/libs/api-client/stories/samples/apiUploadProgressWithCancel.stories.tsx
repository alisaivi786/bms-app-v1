import React, { useRef, useState } from 'react';
import { z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
import { Meta, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';

type ComponentType = React.FC;

// API Definition for file upload
const postDocumentUpload = createAPIDefinition({
	method: 'POST',
	url: 'https://healthindividualdev.shory.com/api/document/upload',
	headers: {
		'Content-Type': 'multipart/form-data',
	},
	responseSchema: z.object({ fileUrl: z.string(), lastUpdatedOn: z.string() }),
	requestSchema: z.object({
		uploadRef: z.string(),
		encryptedJourneyId: z.string(),
		memberId: z.string(),
		type: z.string(),
		file: z.string(),
		updatedOnInGST: z.string().optional(),
		operationType: z.number(),
	}),
});

/**
 * Upload Progress with Cancel Button Demo
 *
 * This story demonstrates:
 * - How to use AbortController with API calls
 * - Real-time upload progress tracking
 * - Cancel/Abort upload functionality
 * - Proper error handling for cancelled requests
 */
const Template: ComponentType = () => {
	// State management
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error' | 'cancelled'>('idle');
	const [result, setResult] = useState<unknown>();
	const [errors, setErrors] = useState<unknown>();

	// AbortController ref for cancellation
	const abortControllerRef = useRef<AbortController | null>(null);

	// Helper function to format bytes to human-readable format
	const formatBytes = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
	};

	// Handle file selection
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.item(0);

		setSelectedFile(file || null);
		// Reset states when new file is selected
		setProgress(0);
		setUploadStatus('idle');
		setResult(undefined);
		setErrors(undefined);
	};

	// Handle upload with progress tracking and cancellation
	const handleUpload = async () => {
		if (!selectedFile) {
			logger.warn('No file selected');

			return;
		}

		// Step 1: Create new AbortController for this upload
		abortControllerRef.current = new AbortController();
		logger.log('🚀 Starting upload with AbortController');

		// Step 2: Set uploading state
		setIsUploading(true);
		setUploadStatus('uploading');
		setProgress(0);
		setResult(undefined);
		setErrors(undefined);

		try {
			// Step 3: Call API with abort signal
			const res = await postDocumentUpload(
				{
					uploadRef: 'XGLPW2ZN2ZGXNP2',
					encryptedJourneyId: 'fK45sU9y6NoyH3pv9FlsSg',
					memberId: '82b0f8ad-000d-44de-98d6-7ab300fcba5f',
					type: '2',
					file: selectedFile as unknown as string,
					operationType: 1,
				},
				{
					// Step 4: Track progress
					onProgress: (progressEvent) => {
						setProgress(progressEvent.percentage);
						logger.log(`Upload progress: ${progressEvent.percentage.toFixed(1)}%`);
					},
					// Step 5: Pass abort signal - THIS IS THE KEY!
					signal: abortControllerRef.current.signal,
				}
			);

			// Upload completed successfully
			setResult(res);
			setIsUploading(false);
			setUploadStatus('success');
			logger.log('✅ Upload completed successfully');
		} catch (err: unknown) {
			const error = err as { name?: string; status?: number; mapped?: Array<{ code: string }> };

			setErrors(error);
			setIsUploading(false);

			// Step 6: Check if error was due to cancellation
			// API client returns status 998 with NetworkConnection code for cancelled requests
			if (error?.status === 998 && error?.mapped?.some((m) => m.code === 'NetworkConnection')) {
				setUploadStatus('cancelled');
				logger.log('⊗ Upload cancelled by user');
			} else if (error?.name === 'AbortError' || error?.name === 'CanceledError') {
				// Fallback for standard AbortError
				setUploadStatus('cancelled');
				logger.log('⊗ Upload cancelled by user');
			} else {
				setUploadStatus('error');
				logger.error('❌ Upload failed:', err);
			}
		} finally {
			// Step 7: Cleanup
			abortControllerRef.current = null;
		}
	};

	// Handle upload cancellation - THIS IS HOW TO CANCEL!
	const handleCancel = () => {
		if (abortControllerRef.current) {
			logger.log('🛑 Cancelling upload...');
			// This will abort the ongoing request
			abortControllerRef.current.abort();
		}
	};

	// Reset to initial state
	const handleReset = () => {
		setSelectedFile(null);
		setProgress(0);
		setUploadStatus('idle');
		setIsUploading(false);
		setResult(undefined);
		setErrors(undefined);
	};

	return (
		<div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px' }}>
			<h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
				Upload with Cancel Button - AbortController Demo
			</h1>

			{/* Debug Info */}
			<div
				style={{
					marginBottom: '16px',
					padding: '12px',
					backgroundColor: '#e8f4fd',
					borderRadius: '6px',
					fontSize: '14px',
					fontFamily: 'monospace',
				}}
			>
				<strong>Status:</strong> {uploadStatus} | <strong>Progress:</strong> {progress.toFixed(1)}%
			</div>

			{/* File Selection */}
			<div style={{ marginBottom: '24px' }}>
				<input
					type="file"
					onChange={handleFileSelect}
					disabled={isUploading}
					style={{
						padding: '8px',
						border: '1px solid #ddd',
						borderRadius: '4px',
						width: '100%',
						cursor: isUploading ? 'not-allowed' : 'pointer',
					}}
				/>
				{selectedFile && (
					<div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
						Selected: <strong>{selectedFile.name}</strong> ({formatBytes(selectedFile.size)})
					</div>
				)}
			</div>

			{/* Action Buttons */}
			<div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
				<button
					onClick={handleUpload}
					disabled={!selectedFile || isUploading}
					style={{
						padding: '10px 24px',
						backgroundColor: !selectedFile || isUploading ? '#ccc' : '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: !selectedFile || isUploading ? 'not-allowed' : 'pointer',
						fontSize: '16px',
						fontWeight: '500',
					}}
				>
					{isUploading ? 'Uploading...' : 'Upload File'}
				</button>

				<button
					onClick={handleCancel}
					disabled={!isUploading}
					style={{
						padding: '10px 24px',
						backgroundColor: isUploading ? '#dc3545' : '#ccc',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: isUploading ? 'pointer' : 'not-allowed',
						fontSize: '16px',
						fontWeight: '500',
						opacity: isUploading ? 1 : 0.5,
					}}
				>
					Cancel Upload
				</button>

				{(uploadStatus === 'success' || uploadStatus === 'error' || uploadStatus === 'cancelled') && (
					<button
						onClick={handleReset}
						style={{
							padding: '10px 24px',
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '16px',
							fontWeight: '500',
						}}
					>
						Reset
					</button>
				)}
			</div>

			{/* Progress Display */}
			{(isUploading || uploadStatus !== 'idle') && (
				<div
					style={{
						padding: '20px',
						border: '1px solid #ddd',
						borderRadius: '8px',
						backgroundColor: '#f8f9fa',
						marginBottom: '24px',
					}}
				>
					{/* Status Messages */}
					{uploadStatus === 'success' && !isUploading && (
						<div
							style={{
								padding: '12px',
								marginBottom: '16px',
								backgroundColor: '#d4edda',
								color: '#155724',
								border: '1px solid #c3e6cb',
								borderRadius: '4px',
							}}
						>
							✓ Upload completed successfully!
						</div>
					)}

					{uploadStatus === 'error' && !isUploading && (
						<div
							style={{
								padding: '12px',
								marginBottom: '16px',
								backgroundColor: '#f8d7da',
								color: '#721c24',
								border: '1px solid #f5c6cb',
								borderRadius: '4px',
							}}
						>
							✗ Upload failed. Please try again.
						</div>
					)}

					{uploadStatus === 'cancelled' && !isUploading && (
						<div
							style={{
								padding: '12px',
								marginBottom: '16px',
								backgroundColor: '#fff3cd',
								color: '#856404',
								border: '1px solid #ffeaa7',
								borderRadius: '4px',
							}}
						>
							⊗ Upload cancelled by user
						</div>
					)}

					{/* Simple Progress Bar */}
					<div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '8px',
								fontSize: '14px',
								fontWeight: '500',
							}}
						>
							<span>Upload Progress</span>
							<span>{progress.toFixed(1)}%</span>
						</div>
						<div
							style={{
								width: '100%',
								height: '20px',
								backgroundColor: '#e9ecef',
								borderRadius: '10px',
								overflow: 'hidden',
								border: '1px solid #dee2e6',
							}}
						>
							<div
								style={{
									width: `${progress}%`,
									height: '100%',
									backgroundColor:
										uploadStatus === 'cancelled'
											? '#ffc107'
											: uploadStatus === 'error'
											? '#dc3545'
											: uploadStatus === 'success'
											? '#28a745'
											: '#007bff',
									transition: 'width 0.3s ease',
								}}
							/>
						</div>
					</div>
				</div>
			)}

			{/* API Response Display */}
			{!!result && (
				<div style={{ marginTop: '24px' }}>
					<h3 style={{ marginBottom: '12px', fontSize: '18px' }}>API Response:</h3>
					<pre
						style={{
							padding: '16px',
							backgroundColor: '#f4f4f4',
							borderRadius: '4px',
							overflow: 'auto',
							fontSize: '12px',
							border: '1px solid #ddd',
						}}
					>
						{JSON.stringify(result, null, 2)}
					</pre>
				</div>
			)}

			{/* Error Display */}
			{!!errors && uploadStatus === 'error' && (
				<div style={{ marginTop: '24px' }}>
					<h3 style={{ marginBottom: '12px', fontSize: '18px', color: '#dc3545' }}>Error:</h3>
					<pre
						style={{
							padding: '16px',
							backgroundColor: '#f8d7da',
							borderRadius: '4px',
							overflow: 'auto',
							fontSize: '12px',
							border: '1px solid #f5c6cb',
							color: '#721c24',
						}}
					>
						{JSON.stringify(errors, null, 2)}
					</pre>
				</div>
			)}

			{/* Code Example */}
			<div
				style={{
					marginTop: '32px',
					padding: '20px',
					backgroundColor: '#f8f9fa',
					borderRadius: '8px',
					border: '1px solid #dee2e6',
				}}
			>
				<h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>How to implement cancellation:</h3>
				<pre
					style={{
						backgroundColor: '#ffffff',
						padding: '16px',
						borderRadius: '6px',
						overflow: 'auto',
						fontSize: '13px',
						border: '1px solid #e9ecef',
						margin: 0,
					}}
				>
					{`// 1. Create AbortController
const abortController = new AbortController();

// 2. Pass signal to API call
const result = await yourApiCall(data, {
  onProgress: (event) => {
    console.log(\`Progress: \${event.percentage}%\`);
  },
  signal: abortController.signal  // ← KEY: Pass the signal
});

// 3. To cancel the request
abortController.abort();

// 4. Handle cancellation in catch block
try {
  // ... API call
} catch (error) {
  // Check for API client cancellation (status 998 + NetworkConnection)
  if (error.status === 998 && 
      error.mapped?.some(m => m.code === 'NetworkConnection')) {
    console.log('Request was cancelled');
  }
  // Fallback for standard AbortError
  else if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}`}
				</pre>
			</div>

			{/* Usage Instructions */}
			<div
				style={{
					marginTop: '24px',
					padding: '16px',
					backgroundColor: '#e7f3ff',
					borderLeft: '4px solid #007bff',
					borderRadius: '4px',
				}}
			>
				<h4 style={{ marginTop: 0, marginBottom: '12px' }}>Try it:</h4>
				<ol style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
					<li>Select a file above</li>
					<li>Click &quot;Upload File&quot;</li>
					<li>Watch the progress bar</li>
					<li>Click &quot;Cancel Upload&quot; while it&apos;s uploading</li>
					<li>See the cancellation message appear</li>
				</ol>
			</div>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/Upload Progress with Cancel',
	component: Template,
	parameters: {
		docs: {
			description: {
				component: `
## File Upload with AbortController Cancel Button

A practical example showing developers how to implement upload cancellation using AbortController:

### Key Features

- **Progress Tracking**: Simple progress bar showing upload percentage
- **Cancel Button**: Functional cancel button using AbortController
- **Status Messages**: Clear feedback for success, error, and cancellation states
- **Code Example**: Shows exactly how to implement the cancel functionality

### Implementation Highlights

The story demonstrates:
- How to create and use AbortController with API calls
- Passing the abort signal to your API request
- Proper error handling to detect cancelled requests
- Simple state management for upload status

### For Developers

This story focuses on the practical implementation details that developers need to add upload cancellation to their applications.
				`,
			},
		},
	},
};

export default StoryMeta;

export const UploadProgressWithCancelButton: StoryObj<ComponentType> = {
	args: {},
};
