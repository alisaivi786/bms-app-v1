import { formatDate } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { IJsonBoxProps, JsonBox } from '../../../src/components/JsonBox';

type ComponentType = (args: IJsonBoxProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return <JsonBox {...args} />;
};

const StoryMeta: Meta<IJsonBoxProps> = {
	title: 'Web/Components/JSONBox',
	component: JsonBox,
};

export default StoryMeta;

export const JSONBox: StoryObj<ComponentType> = {
	render: Template,

	args: {
		titleLeft: { label: 'Insurance Company', value: 'Dubai Insurance' },
		titleRight: { label: 'Service Name', value: 'Check Status' },
		request: {
			requestDate: formatDate(new Date()),
			content:
				'{"hasHandicapPermit":false,"hasColorGlassPermit":null,"ownerTcfNo":"1980000009","ownerTcfArabicName":"عبدالباسط  مارى  بالدكريشنان ","ownerTcfEnglishName":"Abdelbaset  Mary  Rala ","isDrivingBanned":false,"plateInfo":{"plateNo":"84051","plateOrgNo":1,"plateColorCode":52,"plateKindCode":1,"plateTypeCode":1,"plateSourceCode":1,"plateColorArabicDesc":"الفئة السابعة","plateColorEnglishDesc":"SEVENTH CATEGORY","plateSourceArabicDesc":"أبوظبي","plateSourceEnglishDesc":"ABU DHABI","plateKindArabicDesc":"خصوصي","plateKindEnglishDesc":"PRIVATE","plateTypeArabicDesc":null,"plateTypeEnglishDesc":null},"insuranceCompanyName":"شركه عمان للتامين - فرع ابوظبى","insuranceKindArabicDesc":"ضد الغير","insuranceKindEnglishDesc":"Third-Party","insuranceExpiryDate":"21-APR-23","insurancePolicyNo":"0200969062","mortgageDesc":null,"mortgageRef":null,"colorCode":"410","colorArabicDesc":"ازرق/رمادي","colorEnglishDesc":"BLUE/GRAY","typeCode":"2","typeArabicDesc":"مركبة خفيفة","typeEnglishDesc":"LIGHT VEHICLE","nationalityCode":"401","nationalityArabicDesc":"بريطانيا","nationalityEnglishDesc":"UNITED KINGDOM","year":"2012","chairs":"5","makeCode":"33","makeArabicDesc":"جاكوار","makeEnglishDesc":"JAGUAR","modelCode":"5068","modelArabicDesc":"اكس اف","modelEnglishDesc":"XF","kindCode":"2","kindArabicDesc":"صالون","kindEnglishDesc":"صالون","weightEmpty":"2000","weightFull":"2300","registrationDate":"07-NOV-18","registrationExpiryDate":"21-MAR-23","engineNo":"07040","chassisNo":"1GCEK19TX3Z217090","gearCode":"1","gearArabicDesc":"عادي","gearEnglishDesc":"MANUAL","fuelCode":"1","fuelArabicDesc":"بترول","fuelEnglishDesc":"PETROL","weightCode":"2","weightArabicDesc":"كيلو","weightEnglishDesc":"K","steeringCode":"2","steeringArabicDesc":null,"steeringEnglishDesc":null,"cylinder":"6","axisCount":"0","doorCount":"4","horsePower":"200","wheelsCount":"4","registrationRemarks":null,"nationalityISOCode":null,"glassColoringPermitCode":null,"glassColoringPermitArabicDesc":null,"glassColoringPermitEnglishDesc":null,"glassColoringPermitExpiryDate":null,"insuranceCompanyNameEn":"Oman Insurance Company - Abu Dhabi branch"}',
		},
		response: {
			responseDate: formatDate(new Date()),
			content:
				'{"hasHandicapPermit":false,"hasColorGlassPermit":null,"ownerTcfNo":"1980000009","ownerTcfArabicName":"عبدالباسط  مارى  بالدكريشنان ","ownerTcfEnglishName":"Abdelbaset  Mary  Rala ","isDrivingBanned":false,"plateInfo":{"plateNo":"84051","plateOrgNo":1,"plateColorCode":52,"plateKindCode":1,"plateTypeCode":1,"plateSourceCode":1,"plateColorArabicDesc":"الفئة السابعة","plateColorEnglishDesc":"SEVENTH CATEGORY","plateSourceArabicDesc":"أبوظبي","plateSourceEnglishDesc":"ABU DHABI","plateKindArabicDesc":"خصوصي","plateKindEnglishDesc":"PRIVATE","plateTypeArabicDesc":null,"plateTypeEnglishDesc":null},"insuranceCompanyName":"شركه عمان للتامين - فرع ابوظبى","insuranceKindArabicDesc":"ضد الغير","insuranceKindEnglishDesc":"Third-Party","insuranceExpiryDate":"21-APR-23","insurancePolicyNo":"0200969062","mortgageDesc":null,"mortgageRef":null,"colorCode":"410","colorArabicDesc":"ازرق/رمادي","colorEnglishDesc":"BLUE/GRAY","typeCode":"2","typeArabicDesc":"مركبة خفيفة","typeEnglishDesc":"LIGHT VEHICLE","nationalityCode":"401","nationalityArabicDesc":"بريطانيا","nationalityEnglishDesc":"UNITED KINGDOM","year":"2012","chairs":"5","makeCode":"33","makeArabicDesc":"جاكوار","makeEnglishDesc":"JAGUAR","modelCode":"5068","modelArabicDesc":"اكس اف","modelEnglishDesc":"XF","kindCode":"2","kindArabicDesc":"صالون","kindEnglishDesc":"صالون","weightEmpty":"2000","weightFull":"2300","registrationDate":"07-NOV-18","registrationExpiryDate":"21-MAR-23","engineNo":"07040","chassisNo":"1GCEK19TX3Z217090","gearCode":"1","gearArabicDesc":"عادي","gearEnglishDesc":"MANUAL","fuelCode":"1","fuelArabicDesc":"بترول","fuelEnglishDesc":"PETROL","weightCode":"2","weightArabicDesc":"كيلو","weightEnglishDesc":"K","steeringCode":"2","steeringArabicDesc":null,"steeringEnglishDesc":null,"cylinder":"6","axisCount":"0","doorCount":"4","horsePower":"200","wheelsCount":"4","registrationRemarks":null,"nationalityISOCode":null,"glassColoringPermitCode":null,"glassColoringPermitArabicDesc":null,"glassColoringPermitEnglishDesc":null,"glassColoringPermitExpiryDate":null,"insuranceCompanyNameEn":"Oman Insurance Company - Abu Dhabi branch"}',
		},
	},
};

export const JSONBoxWithXML: StoryObj<ComponentType> = {
	render: Template,

	args: {
		request: {
			requestDate: formatDate(new Date()),
			content:
				'<?xml version="1.0" encoding="utf-16"?><SubmitMedicalInsuranceRequestType xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Header xmlns="http://id.gov.ae/schema/commontypes"><serviceName>SD_SUBMIT_MEDICAL_INSURANCE</serviceName><sourceChannel>SLASHDATA</sourceChannel><serviceVersion>1.0</serviceVersion><serviceLanguage>EN</serviceLanguage><userName>w9EFR1nQ5PMlpRDKaaw6iVBS7UKMlOjlucW7uNjNpbY=</userName><password>/huNKcBEavprUlZ2GTSEQUZYBduzaBJLG8jT41PdPtE=</password><hash>K0MLDPZGLlGM9BGMQZjCBT8GHjm9zqtPJm+r1wFVz0ZIdMMykOFigwT/EM5EeKLLeHbdL2qFNMAW7novRypzbA==</hash></Header><Body xmlns="http://id.gov.ae/schema/MedicalInsuranceService"><transactionRefNo>1580000040482160223045539</transactionRefNo><insurancePolicies><insurancePolicy><unifiedNo>45597528</unifiedNo><idn>784199069041905</idn><fileType>1</fileType><fileNumber>VF123425</fileNumber><firstAName>First</firstAName><lastAName>LastName</lastAName><fullAName>First</fullAName><firstEName>Arshad</firstEName><middleEName>Middle</middleEName><lastEName>Khan</lastEName><fullEName>Fahad Khan</fullEName><birthDate>1992-01-02</birthDate><gender>1</gender><natCode>IN</natCode><cardIssueDate>2023-02-02</cardIssueDate><cardExpiryDate>2024-02-01</cardExpiryDate><policyNumber>P20230207_01</policyNumber><policyHolder>Arshad Salmani</policyHolder><requestDate>2023-02-16T04:55:39</requestDate><operationType>I</operationType><companyCode>001</companyCode><companyNameAr>سلامة</companyNameAr><companyNameEn>SALAMA</companyNameEn><entityReference>13980</entityReference></insurancePolicy></insurancePolicies><timestamp>2023-02-16T04:55:39</timestamp></Body></SubmitMedicalInsuranceRequestType>',
		},
		response: {
			responseDate: formatDate(new Date()),
			content:
				'<?xml version="1.0" encoding="utf-16"?><submitMedicalInsuranceResponse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><submitMedicalInsuranceResponse1><Header xmlns="http://id.gov.ae/schema/commontypes"><serviceName>SD_SUBMIT_MEDICAL_INSURANCE</serviceName><sourceChannel>SLASHDATA</sourceChannel><serviceVersion>1.0</serviceVersion><serviceLanguage>EN</serviceLanguage><userName /><password /><hash>bYhUrwNYPSz5jRsBv4Ka8/odO+B1DezMInRk2vjfDlTjBX397Wc5tQ0YBmLhC54NpNzFguN1fBdKwiK/6l5tDQ==</hash></Header><Body xmlns="http://id.gov.ae/schema/MedicalInsuranceService"><transactionRefNo>1580000040482160223045539</transactionRefNo><responseCode>0</responseCode><responseDescription>Success</responseDescription><batchId>1580000040482160223045539</batchId><errorRecsCount>0</errorRecsCount><timestamp>2023-02-16T16:55:23.879+04:00</timestamp></Body></submitMedicalInsuranceResponse1></submitMedicalInsuranceResponse>',
		},
	},
};
