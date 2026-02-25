import React, { useRef, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import { ProgressBar } from './ProgressBar';
import { StepConnector } from './StepConnector';
import { StepItem } from './StepItem';
import { StepperHeader } from './StepperHeader';
import { JourneyStepperProps } from './types';
import { useStepMeasurements } from './useStepMeasurements';

export const JourneyStepper: React.FC<JourneyStepperProps> = ({
	steps,
	currentStepIndex,
	onStepPress,
	hideProgressBar = false,
}) => {
	const { tw, reverseLayout } = useMobileUIConfigOptions();
	const [modalVisible, setModalVisible] = useState(false);
	const [headerTop, setHeaderTop] = useState(0);
	const stepperBodyRef = useRef<View | null>(null);
	const headerRef = useRef<View | null>(null);
	const indicatorRefs = useRef<(View | null)[]>(new Array(steps.length).fill(null));

	const stepIndex = Math.max(0, Math.min(currentStepIndex, steps.length - 1));

	const { indicatorPositions, onLayout, measureHeader } = useStepMeasurements({
		isOpen: modalVisible,
		setHeaderTop,
		steps,
		stepperBodyRef,
		indicatorRefs,
		headerRef,
	});

	return (
		<View style={tw`flex-col gap-1`}>
			<View ref={headerRef} onLayout={measureHeader}>
				<StepperHeader
					currentStepIndex={stepIndex}
					steps={steps}
					toggleOpen={() => {
						setModalVisible(!modalVisible);
					}}
					tw={tw}
				/>
				<Modal visible={modalVisible} transparent={true} animationType="fade">
					<Pressable
						accessibilityLabel="Close modal by touching background"
						style={tw`flex-1 bg-transparent`}
						onPress={() => setModalVisible(false)}
					>
						<View
							ref={stepperBodyRef}
							onLayout={onLayout}
							style={[tw`absolute left-0 right-0 rounded-b-lg`, { top: headerTop }]}
						>
							<View style={tw`bg-brand-50 px-4 pb-2.5 pt-0.3`}>
								{indicatorPositions.length === steps.length &&
									steps
										.slice(0, -1)
										.map((_, index) => (
											<StepConnector
												key={`line-${index}`}
												index={index}
												currentStepIndex={stepIndex}
												startY={indicatorPositions[index]}
												endY={indicatorPositions[index + 1]}
												tw={tw}
											/>
										))}
								<FlatList
									data={steps}
									keyExtractor={(_, index) => `step-${index}`}
									renderItem={({ item: step, index }) => (
										<StepItem
											step={step}
											index={index}
											currentStepIndex={stepIndex}
											onStepPress={onStepPress}
											indicatorRef={(ref) => (indicatorRefs.current[index] = ref)}
											tw={tw}
											isFirst={index === 0}
											setIsOpen={setModalVisible}
											reverseLayout={reverseLayout}
										/>
									)}
									contentContainerStyle={tw`gap-2`}
									showsVerticalScrollIndicator={false}
									scrollEnabled={false}
									style={tw`max-h-[80vh]`}
									nestedScrollEnabled
								/>
							</View>
							<ProgressBar steps={steps} currentStepIndex={stepIndex} tw={tw} isHide={hideProgressBar} />
						</View>
					</Pressable>
				</Modal>
			</View>
			<ProgressBar steps={steps} currentStepIndex={stepIndex} tw={tw} isHide={hideProgressBar} />
		</View>
	);
};
