import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { IJsonCardProps, JsonCard } from '../../../src/components/JsonCard';

type ComponentType = (args: IJsonCardProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return <JsonCard {...args} />;
};

const StoryMeta: Meta<IJsonCardProps> = {
	title: 'Web/Components/JSONBox',
	component: JsonCard,
};

export default StoryMeta;

export const JSONCard: StoryObj<ComponentType> = {
	render: Template,
	args: {
		title: 'Request:',
		subtitle: 'This is request sample',
		content:
			'{"hasHandicapPermit":false,"hasColorGlassPermit":null,"ownerTcfNo":"1980000009","ownerTcfArabicName":"عبدالباسط  مارى  بالدكريشنان ","ownerTcfEnglishName":"Abdelbaset  Mary  Rala ","isDrivingBanned":false,"plateInfo":{"plateNo":"84051","plateOrgNo":1,"plateColorCode":52,"plateKindCode":1,"plateTypeCode":1,"plateSourceCode":1,"plateColorArabicDesc":"الفئة السابعة","plateColorEnglishDesc":"SEVENTH CATEGORY","plateSourceArabicDesc":"أبوظبي","plateSourceEnglishDesc":"ABU DHABI","plateKindArabicDesc":"خصوصي","plateKindEnglishDesc":"PRIVATE","plateTypeArabicDesc":null,"plateTypeEnglishDesc":null},"insuranceCompanyName":"شركه عمان للتامين - فرع ابوظبى","insuranceKindArabicDesc":"ضد الغير","insuranceKindEnglishDesc":"Third-Party","insuranceExpiryDate":"21-APR-23","insurancePolicyNo":"0200969062","mortgageDesc":null,"mortgageRef":null,"colorCode":"410","colorArabicDesc":"ازرق/رمادي","colorEnglishDesc":"BLUE/GRAY","typeCode":"2","typeArabicDesc":"مركبة خفيفة","typeEnglishDesc":"LIGHT VEHICLE","nationalityCode":"401","nationalityArabicDesc":"بريطانيا","nationalityEnglishDesc":"UNITED KINGDOM","year":"2012","chairs":"5","makeCode":"33","makeArabicDesc":"جاكوار","makeEnglishDesc":"JAGUAR","modelCode":"5068","modelArabicDesc":"اكس اف","modelEnglishDesc":"XF","kindCode":"2","kindArabicDesc":"صالون","kindEnglishDesc":"صالون","weightEmpty":"2000","weightFull":"2300","registrationDate":"07-NOV-18","registrationExpiryDate":"21-MAR-23","engineNo":"07040","chassisNo":"1GCEK19TX3Z217090","gearCode":"1","gearArabicDesc":"عادي","gearEnglishDesc":"MANUAL","fuelCode":"1","fuelArabicDesc":"بترول","fuelEnglishDesc":"PETROL","weightCode":"2","weightArabicDesc":"كيلو","weightEnglishDesc":"K","steeringCode":"2","steeringArabicDesc":null,"steeringEnglishDesc":null,"cylinder":"6","axisCount":"0","doorCount":"4","horsePower":"200","wheelsCount":"4","registrationRemarks":null,"nationalityISOCode":null,"glassColoringPermitCode":null,"glassColoringPermitArabicDesc":null,"glassColoringPermitEnglishDesc":null,"glassColoringPermitExpiryDate":null,"insuranceCompanyNameEn":"Oman Insurance Company - Abu Dhabi branch"}',
	},
};
