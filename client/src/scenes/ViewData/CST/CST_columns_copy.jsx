const generateColumns = (maxMembers, columns) => {
  return Array.from({ length: maxMembers }, (_, index) => {
    return columns.map((column) => ({
      field: column.field,
      headerName: column.headerName,
      valueGetter: (params) => {
        // console.log(column.field);

        const member = params?.data?.Emergency_Data?.[index];
        // console.log(Object.keys(member ?? {}));

        if (column.field.startsWith("C")) {
          console.log("PartC");
          // console.log("PartC : ", member?.PartCLoop);
          member?.PartCLoop?.forEach((partC) => {
            console.log(Object.keys(partC ?? {}));
            return generatePartCColumns(1, PartCcolumns, partC);
          });
          // console.log(Object.keys(member ?? []));
        } else if (column.valueGetter) {
          return column.valueGetter(member);
        } else {
          if (Array.isArray(member?.[column.field.split("_")[0]])) {
            return member?.[column.field.split("_")[0]]?.[
              column.field.split("_")[1]
            ];
          } else {
            return member ? member[column.field] : "";
          }
        }
      },
    }));
  }).flat();
};

const generatePartCColumns = (maxMembers, columns, data) => {
  return Array.from({ length: maxMembers }, (_, index) => {
    return columns.map((column) => ({
      field: column.field,
      headerName: column.headerName,
      valueGetter: (params) => {
        const PartC = params?.data?.Emergency_Data?.[index]?.PartCLoop;
        const PartCLength =
          params?.data?.Emergency_Data?.[index]?.PartCLoop?.length;

        console.log("PartCLength : ", PartCLength);

        if (!PartC) return ""; // If no member data, return empty string
      },
    }));
  }).flat();
};

// const generatePartCColumns = (maxMembers, columns) => {
//   return Array.from({ length: maxMembers }, (_, index) => {
//     return columns.map((column) => ({
//       field: column.field,
//       headerName: column.headerName,
//       valueGetter: (params) => {
//         const PartC = params?.data?.Emergency_Data?.[index].PartCLoop;
//         const PartCLength =
//           params?.data?.Emergency_Data?.[index].PartCLoop?.length;

//         console.log("PartCLength : ", PartCLength);

//         if (!PartC) return ""; // If no member data, return empty string
//       },
//     }));
//   }).flat();
// };

const generateMemberColumns = (maxMembers, columns, table_name) => {
  return Array.from({ length: maxMembers }, (_, index) => {
    return columns.map((column) => ({
      field: column.field,
      headerName: column.headerName,
      valueGetter: (params) => {
        const member = params?.data?.[table_name]?.[index];

        if (column.valueGetter) {
          return column.valueGetter(member);
        } else {
          if (Array.isArray(member?.[column.field.split("_")[0]])) {
            return member?.[column.field.split("_")[0]]?.[
              column.field.split("_")[1]
            ];
          } else {
            return member ? member[column.field] : "";
          }
        }
      },
    }));
  }).flat();
};

const MemberColumns = [
  { field: `name`, headerName: "Name" },
  { field: `age`, headerName: "Age" },
  { field: `sex`, headerName: "Sex" },
  { field: `MemberID`, headerName: "MemberID" },
];

export const CSTColumns = (data) => {
  let maxMembers = Math.max(
    1,
    ...(data ?? []).map((row) => {
      return row?.AC3_table?.length || 1;
    })
  );
  let DeathMembers = Math.max(
    1,
    ...(data ?? []).map((row) => {
      return row?.AC15_table?.length || 1;
    })
  );
  let PartBLoopLength = Math.max(
    1,
    ...(data ?? []).map((row) => {
      return row?.Emergency_Data?.length || 1;
    })
  );
  let PartCLoopLength = Math.max(
    1,
    ...(data ?? []).map((row) => {
      return row?.Emergency_Data?.PartCLoop?.length || 1;
    })
  );

  // maxMembers = data?.Emergency_Data?.length ?? 1;
  const generateMemeberColumns = generateMemberColumns(
    maxMembers,
    MemberColumns,
    "AC3_table"
  );
  const generateDeathMemeberColumns = generateMemberColumns(
    DeathMembers,
    MemberColumns,
    "AC15_table"
  );
  return [
    {
      headerName: "Record ID",
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 250,
      valueGetter: (params) => params.data._id,
    },

    ...PartAcolumns(generateMemeberColumns, generateDeathMemeberColumns),
    ...generateColumns(PartBLoopLength, PartBcolumns),
    ...generatePartCColumns(PartBLoopLength, PartCcolumns),
    ...generateColumns(PartBLoopLength, PartDcolumns),
    ...generateColumns(PartBLoopLength, PartEcolumns),
    ...generateColumns(PartBLoopLength, PartFcolumns),
    // ...generateColumns(maxMembers, PartGcolumns),
    // ...generateColumns(maxMembers, PartHcolumns),
  ];
};

const PartAcolumns = (generateMemeberColumns, generateDeathMemeberColumns) => {
  return [
    { field: "AA1", headerName: "AA.1 Date & Time:" },
    { field: "AA2", headerName: "AA.2 Site:" },
    { field: "AA3", headerName: "AA.3 Name of the Data Collector:" },
    {
      field: "AA4",
      headerName: "AA.4 Respondent ID:",
      valueGetter: (params) => params?.data?.Respondent_ID,
    },
    {
      field: "AB1",
      headerName:
        "AB.1 Block [Drop Down Menu of Blocks for Respective District]",
    },
    { field: "AB2", headerName: "AB.2 Type of PSU:" },
    { field: "AB3", headerName: "AB.3 Name of PSU (Town/Village):" },
    {
      field: "AB4",
      headerName: "AB.4 GPS Co-ordinates: (Latitude)",
      valueGetter: (params) => params?.data?.AB4?.latitude,
    },
    {
      field: "AB4",
      headerName: "AB.4 GPS Co-ordinates: (Longitude)",
      valueGetter: (params) => params?.data?.AB4?.longitude,
    },
    {
      field: "AB4",
      headerName: "AB.4 GPS Co-ordinates: (State)",
      valueGetter: (params) => params?.data?.AB4?.district,
    },
    {
      field: "AB4",
      headerName: "AB.4 GPS Co-ordinates: (district)",
      valueGetter: (params) => params?.data?.AB4?.state,
    },
    {
      field: "AB5",
      headerName: "AB.5 Household ID Number:",
      valueGetter: (params) => params?.data?.Household_ID,
    },
    {
      field: "AB6",
      headerName:
        "AB.6 For how long have you been living in this city/village with your family?",
    },
    {
      field: "AC1",
      headerName:
        "AC.1 How many members are currently residing in his household?",
    },
    ...generateMemeberColumns,
    { field: "AC2_1", headerName: "AC.2.1 Name of Respondent?" },
    {
      field: "AC3",
      headerName:
        "AC.3 Are there any other persons such as small children or infants that we have not listed?",
    },
    {
      field: "AC4",
      headerName:
        "AC.4 Are there any other people who may not be members of your family such as domestic servants who usually live here?",
    },
    {
      field: "AC5",
      headerName:
        "AC.5 In the past one year, did any member of this household have any health emergency that could have required any sort of medical attention or treatment?",
    },
    {
      field: "AC6_1",
      headerName:
        "AC.6.1 In the past one year, did you or any member of this household suffered from sudden injury in Road Traffic Accident/ fracture/ severe fall/ drowning/ stabbing/ gunshot/ any other assault/ any attempt to self-harm/ domestic violence/ homicidal etc.?",
    },
    {
      field: "AC6_1_if",
      headerName:
        "AC6.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC6_2",
      headerName:
        "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    // {
    //   field: "AC6_2",
    //   headerName:
    //     "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
    // },
    {
      field: "AC7_1",
      headerName:
        "AC.7.1 In the past one year, did you or any member of this household suffered from severe/ minor burns etc.",
    },
    {
      field: "AC7_1_if",
      headerName:
        "AC.7.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC7_2",
      headerName:
        "Ac.7.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC8_1",
      headerName:
        "AC.8.1 In the past one year, has anyone in your household had a history of heart attack or sudden onset of acute chest pain/ heaviness/ constriction, with possible radiation to the left arm, neck, or back, associated with symptoms such as upper abdominal pain/ palpitations/ dizziness/ profuse sweating, and exacerbated by exertion after meals?",
    },
    {
      field: "AC8_1_if",
      headerName:
        "AC.8.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC8_2",
      headerName:
        "AC.8.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC9_1",
      headerName:
        "Ac.9.1 In the past one year, did you or any member of this household suffered with brain stroke or symptoms like sudden onset of weakness, especially one side of the body/ loss of consciousness/ altered sensorium/ Imbalance/ blurred vision/ facial deviation/ drooping of eyelid/ speech abnormality with numbness and tingling sensation, or difficulty in speaking or understanding speech (aphasia), or sudden severe headache with no known cause of one's life (haemorrhagic strokes)?",
    },
    {
      field: "AC9_1_if",
      headerName:
        "AC.9.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC9_2",
      headerName:
        "AC.9.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC10_1",
      headerName:
        "AC.10.1 In the past one year, has anyone in your household experienced breathlessness with or without sudden onset of fever/ cough with expectoration/ chest pain (pleuritic)/ fast breathing/ not able to speak complete sentences/ loss of consciousness/ or chest tightness leading to suspicion of pneumonia?",
    },
    {
      field: "AC10_1_if",
      headerName:
        "AC.10.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC10_2",
      headerName:
        "AC.10.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC11_1",
      headerName:
        "AC.11.1 In the past one year, did any women in your household give birth to a child or had any episode of miscarriage/ abortion?",
    },
    {
      field: "AC11_1_if",
      headerName:
        "AC.11.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC11_2",
      headerName:
        "AC.11.2 If “Yes” to AC.11.1, did women or mother suffer with any condition like vaginal bleeding that required blood transfusion or sudden increase in blood pressure or decreased urine output or loss of fetal movements or loss of consciousness or seizure or fits etc., before / during / after delivery?",
    },
    {
      field: "AC11_2_if",
      headerName:
        "AC.11.2.2 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC11_3",
      headerName:
        "AC.11.3 If “Yes” to AC.11.2, could you please tell us who suffered with this condition?",
    },
    {
      field: "AC11_4",
      headerName:
        'AC.11.4 If "Yes" to AC.11.1, At the time of birth did the new-born had any issues such as not cried/ delayed cry/ not able to breath/ body getting cold/ minimal limb movement/ blue discoloration/ taken no ICU after delivery/ convulsion/ sudden onset of fever/ difficulty in breast feeding/ excessive diarrhoea/ jaundice or any other condition that required a longer hospital stay before being discharged/ that required a further admission after discharge within the first month of the birth?',
    },
    {
      field: "AC11_4_if",
      headerName:
        "AC.11.4.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC11_5",
      headerName:
        "AC.11.5 If “Yes” to AC.11.4, could you please tell us who suffered with this condition?",
    },
    {
      field: "AC12_1",
      headerName:
        "AC.12.1 In the past one year have you or anyone from your family member been bitten by a snake?",
    },
    {
      field: "AC12_1_if",
      headerName:
        "AC.12.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC12_2",
      headerName:
        "AC.12.2 If “Yes”, could you please tell who all suffered with this condition?",
    },
    {
      field: "AC13_1",
      headerName:
        "AC.13.1 In the past one year, did you or anyone of your family member have a history of accidental/ intentional ingestion of poison/ ingestion or exposure to pesticides/ insecticides/ ingestion of rat poison/ phenyl any hazardous substance/ chemical substance or any other substance that could have required any sort of medical attention or treatment?",
    },
    {
      field: "AC13_1_if",
      headerName:
        "AC.13.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC13_2",
      headerName:
        "AC.13.2 If Yes, Could you please tell who all suffered with this condition?",
    },
    {
      field: "AC14_1",
      headerName:
        "AC.14.1 Apart from the above-mentioned conditions, did anyone suffer from any other conditions that required immediate emergency services?",
    },
    {
      field: "AC14_1_if",
      headerName:
        "AC.14.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC14_2",
      headerName:
        "AC.14.2 If yes, could you please tell who all suffered with this condition?",
    },
    {
      field: "AC15_1",
      headerName:
        "AC.15.1 In the last one year, did any member in your household lost his/her life due to any health emergency condition?",
    },
    ...generateDeathMemeberColumns,
    {
      field: "AC15_2",
      headerName:
        "AC.15.2 If yes, how many members in your household lost his/her life due to any health emergency condition (Specify)",
    },
    {
      field: "AC15_4_0",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Trauma)",
      valueGetter: (params) => params?.AC15_4?.[0],
    },
    {
      field: "AC15_4_1",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Burn: Severe / Minor burns)",
      valueGetter: (params) => params?.AC15_4?.[1],
    },
    {
      field: "AC15_4_2",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = STEMI)",
      valueGetter: (params) => params?.AC15_4?.[2],
    },
    {
      field: "AC15_4_3",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Stroke)",
      valueGetter: (params) => params?.AC15_4?.[3],
    },
    {
      field: "AC15_4_4",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Acute Respiratory Illness)",
      valueGetter: (params) => params?.AC15_4?.[4],
    },
    {
      field: "AC15_4_5",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Postpartum Haemorrhage & Pre-Eclampsia)",
      valueGetter: (params) => params?.AC15_4?.[5],
    },
    {
      field: "AC15_4_6",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Neonatal Emergency)",
      valueGetter: (params) => params?.AC15_4?.[6],
    },
    {
      field: "AC15_4_7",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Snake bite)",
      valueGetter: (params) => params?.AC15_4?.[7],
    },
    {
      field: "AC15_4_8",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Poisoning)",
      valueGetter: (params) => params?.AC15_4?.[9],
    },
    {
      field: "AC15_4_9",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = others)",
      valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[0],
    },
    {
      field: "AC15_4_9_other_specify",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (Others(Specify))",
      valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[1],
    },
  ];
};

const PartCcolumns = [
  {
    field: "C1",
    headerName:
      "C.1 Who took the decision to refer/ shift the patient to another facility?",
    // valueGetter: (params) => params?.C1?.split(":")[0],
  },
  {
    field: "C1",
    headerName:
      "C.1 Who took the decision to refer/ shift the patient to another facility? (Other Specify)",
    // valueGetter: (params) => params?.C1?.split(":")[1],
  },
  {
    field: "C2_0",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Serious illness requiring higher centre)",
  },
  {
    field: "C2_1",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Unavailability of doctor)",
  },
  {
    field: "C2_2",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Unavailability of specialist )",
  },
  {
    field: "C2_3",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Medicines unavailable)",
  },
  {
    field: "C2_4",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Admission facility unavailable)",
  },
  {
    field: "C2_5",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Unavailability of bed)",
  },
  {
    field: "C2_6",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Inappropriate staff behaviour)",
  },
  {
    field: "C2_7",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Others)",
    valueGetter: (params) => params?.C2_7?.split(":")[0],
  },
  {
    field: "C2_7_other_specify",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (Other Specify)",
    valueGetter: (params) => params?.C2_7?.split(":")[1],
  },
  { field: "C3", headerName: "C.3 Which facility were you referred?" },
  {
    field: "C4",
    headerName:
      "C.4 If referred by a health facility, was a referral slip given?",
  },
  {
    field: "C5",
    headerName:
      "C.5 How did you or the patient reach the referred health care facility?",
    valueGetter: (params) => params?.C5?.split(":")[0],
  },
  {
    field: "C5_other_specify",
    headerName:
      "C.5 How did you or the patient reach the referred health care facility? (Other Specify)",
    valueGetter: (params) => params?.C5?.split(":")[1],
  },
  {
    field: "C6",
    headerName:
      "C.6 What type of transport was used to reach the referred health care facility?",
    valueGetter: (params) => params?.C6?.split(":")[0],
  },
  {
    field: "C6_other_specify",
    headerName:
      "C.6 What type of transport was used to reach the referred health care facility? (Other Specify)",
    valueGetter: (params) => params?.C6?.split(":")[1],
  },
  {
    field: "C7",
    headerName:
      "C.7 If Govt. Ambulance, Which ambulance service you opted for?",
    valueGetter: (params) => params?.C7?.split(":")[0],
  },
  {
    field: "C7_other_specify",
    headerName:
      "C.7 If Govt. Ambulance, Which ambulance service you opted for? (Other Specify)",
    valueGetter: (params) => params?.C7?.split(":")[1],
  },
  {
    field: "C8",
    headerName:
      "C.8 Were there any problems in arranging for transport of the patient?",
    valueGetter: (params) => params?.C8?.split(":")[0],
  },
  {
    field: "C8_other_specify",
    headerName:
      "C.8 Were there any problems in arranging for transport of the patient? (Other Specify)",
    valueGetter: (params) => params?.C8?.split(":")[1],
  },
  {
    field: "C9",
    headerName:
      "C.9 How much time the ambulance/ any transport took to reach the referring facility? (In Min/Hour)",
    valueGetter: (params) =>
      `${params?.C9_1 ?? ""} ${params?.C9_2 ? ":" : ""} ${params?.C9_2 ?? ""}`,
  },
  {
    field: "C10",
    headerName:
      "C.10 How much time the ambulance/ any transport took to reach the referred facility? (In Min/Hour)",
    valueGetter: (params) =>
      `${params?.C10_1 ?? ""} ${params?.C10_2 ? ":" : ""} ${
        params?.C10_2 ?? ""
      }`,
  },
  {
    field: "C11",
    headerName: "C.11 Did the patient go to the referred facility?",
  },
  {
    field: "C12",
    headerName: "C.12 Which type of facility did you or the patient shifted?",
    valueGetter: (params) => params?.C12?.split(":")[0],
  },
  {
    field: "C12",
    headerName:
      "C.12 Which type of facility did you or the patient shifted? (Other Specify)",
    valueGetter: (params) => params?.C12?.split(":")[1],
  },
  {
    field: "C13",
    headerName: "C.13 What was the name of the facility the patient shifted?",
  },
  {
    field: "C14",
    headerName:
      "C.14 Who suggested you visit the above mentioned facility for further emergency care?",
    valueGetter: (params) => params?.C14?.split(":")[0],
  },
  {
    field: "C14",
    headerName:
      "C.14 Who suggested you visit the above mentioned facility for further emergency care? (Other Specify)",
    valueGetter: (params) => params?.C14?.split(":")[1],
  },
  {
    field: "C15",
    headerName:
      "C.15 How long after reaching the referral HCF (in emergency) was the patient attended?",
  },
  {
    field: "C16",
    headerName: "C.16 Who attended the patient at the referral HCF?",
  },
  {
    field: "C17",
    headerName: "C.17 Was any treatment started at the referral HCF?",
  },
  {
    field: "C18",
    headerName:
      "C.18 Were any laboratory &/or radiology investigations done at the HCF?",
  },
  {
    field: "C19",
    headerName:
      "C.19 How much time was spent in investigations at referral HCF?",
  },
  {
    field: "C20",
    headerName:
      "C.20 What was the final outcome of visiting the referral facility?",
  },
  {
    field: "C21",
    headerName:
      "C.21 What was the final diagnosis on consultation with the doctor or mentioned in the final discharge summary?",
  },
];

const PartBcolumns = [
  {
    field: "Name",
    headerName: "Name",
  },
  {
    field: "Emergency",
    headerName: "Emergency",
  },
  {
    field: "B0",
    headerName:
      "B.0 When did the Patient (Name of the patient from the list) suffered with this condition?",
  },
  { field: "B1", headerName: "B.1 Marital satus:" },
  { field: "B2", headerName: "B.2 Level of education:" },
  { field: "B3", headerName: "B.3 Occupation:" },
  {
    field: "B4_0",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Private cashless)",
  },
  {
    field: "B4_1",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Private reimbursement)",
  },
  {
    field: "B4_2",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Central Health Insurance Scheme (Ayushmaan Bharat/ CGHS / etc.))",
  },
  {
    field: "B4_3",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = State Health Insurance Scheme)",
  },
  {
    field: "B4_4",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Co-Payment)",
  },
  {
    field: "B4_5",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Community Health Insurance Programme)",
  },
  {
    field: "B4_6",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = None)",
  },
  {
    field: "B4_7",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Prefer not to disclose/ Refuse)",
  },
  {
    field: "B4_8",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Don’t Know)",
  },
  { field: "B5_dt", headerName: "B.5 When did this incident take place?" },
  {
    field: "B6",
    headerName: "B.6 How sure/confident are you about the time of Incident?",
  },
  {
    field: "B7",
    headerName: "B.7 Where did the medical emergency situation arise?",
  },
  {
    field: "B7",
    headerName:
      "B.7 Where did the medical emergency situation arise? (other Speify)",
  },
  {
    field: "B8",
    headerName:
      "B.8 Which was the first symptom you/ or the person expressed or complaint of during emergency condition?",
  },
  {
    field: "B9",
    headerName:
      "B.9 When was the first symptom of a medical emergency recognised? ",
  },
  {
    field: "B10",
    headerName: "B.10 How sure/confident are you about the time of Incident?",
  },
  {
    field: "B11",
    headerName:
      "B.11 At the start of symptoms was any medication taken/ given at home to alleviate symptoms?",
  },
  {
    field: "B12_if",
    headerName: "B.12 If yes, what medication was given?",
  },
  {
    field: "B13",
    headerName: "B.13 Which was the first symptom recognised as serious?",
  },
  {
    field: "B14",
    headerName: "B.14 Who first recognized the symptoms to be serious?",
  },
  {
    field: "B14",
    headerName:
      "B.14 Who first recognized the symptoms to be serious? (other specify)",
  },
  {
    field: "B15",
    headerName:
      "B.15 What was your first course of action on identifying the emergency condition?",
  },
  {
    field: "B16",
    headerName:
      "B.16 If Home visit by a doctor, then which type of doctor visited to attend the emergency patient?",
  },
  {
    field: "B16",
    headerName:
      "B.16 If Home visit by a doctor, then which type of doctor visited to attend the emergency patient? (Other specify)",
  },
  {
    field: "B17",
    headerName:
      "B.17 Who suggested you visit the healthcare facility for emergency care?",
  },
  {
    field: "B17",
    headerName:
      "B.17 Who suggested you visit the healthcare facility for emergency care? (Other Specify)",
  },
  {
    field: "B18",
    headerName:
      "B.18 How much time did it take to decide to seek care or call an ambulance or any transport after recognizing the symptom? (In Min/Hour)",
    valueGetter: (params) =>
      `${params?.B18_1 ?? ""} ${params?.B18_2 ? ":" : ""} ${
        params?.B18_2 ?? ""
      }`,
  },
  {
    field: "B19",
    headerName:
      "B.19 How did you or the patient reach the first health care facility?",
    valueGetter: (params) => params?.B19?.split(":")[0],
  },
  {
    field: "B19",
    headerName:
      "B.19 How did you or the patient reach the first health care facility? (Other specify)",
    valueGetter: (params) => params?.B19?.split(":")[1],
  },
  {
    field: "B20",
    headerName:
      "B.20 What type of transport was used to reach the first health care facility?",
    valueGetter: (params) => params?.B20?.split(":")[0],
  },
  {
    field: "B20",
    headerName:
      "B.20 What type of transport was used to reach the first health care facility? (Other specify)",
    valueGetter: (params) => params?.B20?.split(":")[1],
  },
  {
    field: "B21",
    headerName:
      "B.21 If Govt. Ambulance, Which ambulance service you opted for?",
  },
  {
    field: "B21",
    headerName:
      "B.21 If Govt. Ambulance, Which ambulance service you opted for? (Other Specify)",
  },
  {
    field: "B22",
    headerName:
      "B.22 Were there any problems in arranging for transport of the patient?",
    valueGetter: (params) => params?.B22?.split(":")[0],
  },
  {
    field: "B22",
    headerName:
      "B.22 Were there any problems in arranging for transport of the patient? (other specify)",
    valueGetter: (params) => params?.B22?.split(":")[1],
  },
  {
    field: "B23",
    headerName:
      "B.23 How much time the ambulance/ any transport took to reach the point of incident? (In Min/Hour)",
    valueGetter: (params) =>
      `${params?.B23_1 ?? ""} ${params?.B23_2 ? ":" : ""} ${
        params?.B23_2 ?? ""
      }`,
  },
  {
    field: "B24",
    headerName:
      "B.24 How much time the ambulance/ any transport took to reach the first facility from the point of incident? (in minutes/ hours)",
    valueGetter: (params) =>
      `${params?.B24_1 ?? ""} ${params?.B24_2 ? ":" : ""} ${
        params?.B24_2 ?? ""
      }`,
  },
  {
    field: "B25",
    headerName: "B.24 Which type of facility did you visit first?",
    valueGetter: (params) => params?.B25?.split(":")[0],
  },
  {
    field: "B25",
    headerName:
      "B.24 Which type of facility did you visit first? (Other Specify)",
    valueGetter: (params) => params?.B25?.split(":")[1],
  },
  { field: "B26", headerName: "B.25 What was the name of the facility?" },
  {
    field: "B27_0",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = Self)",
  },
  {
    field: "B27_1",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = Family members)",
  },
  {
    field: "B27_2",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = Neighbour)",
  },
  {
    field: "B27_3",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = ASHA/AWW)",
  },
  {
    field: "B27_4",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = ANM)",
  },
  {
    field: "B27_5",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = CHO)",
  },
  {
    field: "B27_5",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (Other Specify)",
  },
  {
    field: "B28",
    headerName:
      "B.28 How long after reaching the first HCF (in emergency) was the patient attended?",
  },
  {
    field: "B29",
    headerName: "B.29 Who attended the patient at the first HCF?",
  },
  {
    field: "B30",
    headerName: "B.30 Was any treatment started at the HCF?",
  },
  {
    field: "B31",
    headerName:
      "B.31 Were any laboratory &/or radiology investigations done at the HCF?",
  },
  {
    field: "B32",
    headerName: "B.32 How much time was spent in investigations?",
  },
  {
    field: "B33",
    headerName: "B.33 Was the patient shifted to ICU/ CCU/ HDU at HCF?",
  },
  {
    field: "B34",
    headerName:
      "B.34 What was the final outcome of visiting the first facility or home visit by Doctor?",
  },
  {
    field: "B35",
    headerName:
      "B.35 What was the final diagnosis on consultation with the doctor or mentioned in the final discharge summary?",
  },
  // ...generateColumns(2, PartCcolumns),
];

const PartDcolumns = [
  {
    field: "D1_0",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Lack of severity of symptoms)",
  },
  {
    field: "D1_1",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Bad previous experience)",
  },
  {
    field: "D1_2",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = High cost of medical care)",
  },
  {
    field: "D1_3",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Distant healthcare facilities)",
  },
  {
    field: "D1_4",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Non-availability of transport)",
  },
  {
    field: "D1_5",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Dissuaded by family/ friend/ neighbour)",
  },
  {
    field: "D1_6",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Absence of accompanying member)",
  },
  {
    field: "D1_7",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Doctors not taking care or visiting the patient after admission)",
  },
  {
    field: "D1_8",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Unavailability of OTC drugs)",
  },
  {
    field: "D1_9",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Over prescription of medicines)",
  },
  {
    field: "D1_10",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Unnecessary investigations)",
  },
  {
    field: "D1_11",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Cultural barrier)",
  },
  {
    field: "D1_12",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Linguistic barrier)",
  },
  {
    field: "D1_13",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Lack of trust)",
  },
  {
    field: "D1_14",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = other)",
    valueGetter: (params) => params?.D?.[14]?.split(":")[0],
  },
  {
    field: "D1_14_other_specify",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (other specify)",
    valueGetter: (params) => params?.D1?.[14]?.split(":")[1],
  },
  {
    field: "D2_0",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Difficulty in getting the transport to healthcare facilities)",
  },
  {
    field: "D2_1",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Reaching health facility not treating the condition)",
  },
  {
    field: "D2_2",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Unavailability of same clinicians)",
  },
  {
    field: "D2_3",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Long waiting period)",
  },
  {
    field: "D2_4",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Communication barrier)",
  },
  {
    field: "D2_5",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Out of pocket expenditure)",
  },
  {
    field: "D2_6",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Unavailability of OTC drugs)",
  },
  {
    field: "D2_7",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Over prescription of medicines)",
  },
  {
    field: "D2_8",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Doctors not taking care or visiting the patient after admission)",
  },
  {
    field: "D2_9",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Unnecessary investigations)",
  },
  {
    field: "D2_10",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Others)",
    valueGetter: (params) => params?.D2?.[10]?.split(":")[0],
  },
  {
    field: "D2_10_other_specify",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Other specify)",
    valueGetter: (params) => params?.D2?.[10]?.split(":")[1],
  },
  {
    field: "D2_11",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = None of the above)",
  },
  {
    field: "D3_0",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Easy accessibility)",
  },
  {
    field: "D3_1",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Skilled Healthcare provider)",
  },
  {
    field: "D3_2",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Good Professional behaviour)",
  },
  {
    field: "D3_3",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Insurance facility)",
  },
  {
    field: "D3_4",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Affordable services)",
  },
  {
    field: "D3_5",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Insurance Empanelled Health care facility)",
  },
  {
    field: "D3_6",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Good ambience of HCF)",
  },
  {
    field: "D3_7",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Immediate care)",
  },
  {
    field: "D3_8",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Others)",
    valueGetter: (params) => params?.D3?.[8]?.split(":")[0],
  },
  {
    field: "D3_8_other_specify",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (other specify)",
    valueGetter: (params) => params?.D3?.[8]?.split(":")[1],
  },
  {
    field: "D4_0",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Affordability)",
  },
  {
    field: "D4_1",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Availability of Transport)",
  },
  {
    field: "D4_2",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Availability of accompanying person)",
  },
  {
    field: "D4_3",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Distance from facility)",
  },
  {
    field: "D4_4",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Time delay)",
  },
  {
    field: "D4_5",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Others)",
    valueGetter: (params) => params?.D4?.[5]?.split(":")[0],
  },
  {
    field: "D4_5_other_specify",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (other specify)",
    valueGetter: (params) => params?.D4?.[5]?.split(":")[1],
  },
];

const PartEcolumns = [
  { field: "E1", headerName: "E.1 Was the patient covered by any insurance?" },
  {
    field: "E2_0",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Private cashless)",
  },
  {
    field: "E2_1",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Private reimbursement)",
  },
  {
    field: "E2_2",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Central Health Insurance Scheme (Ayushmaan Bharat/ CGHS / etc.))",
  },
  {
    field: "E2_3",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = State Health Insurance Scheme)",
  },
  {
    field: "E2_4",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Co-Payment)",
  },
  {
    field: "E2_4",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Community Health Insurance Programme)",
  },
  {
    field: "E2_6",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = None)",
  },
  {
    field: "E3",
    headerName:
      "E.3 How much amount was spent on the following while availing the emergency care service?",
  },
  {
    field: "E4",
    headerName:
      "E.4 What was the approximate overall money spent on the availing the emergency care service?",
  },
  {
    field: "E5",
    headerName:
      "E.5 How much extra amount was spent on the following while availing the emergency care service?",
  },
  {
    field: "E6",
    headerName:
      "E.6 What was the approximate overall money spent on the availing the emergency care service?",
  },
  {
    field: "E7",
    headerName:
      "E.7 What is the cost of lost productivity due to missed workdays for patients and their family caregivers while accessing emergency care services?",
  },
  {
    field: "E8",
    headerName:
      "E.8 What is the cost of lost productivity due to premature death on the availing the emergency care service?",
  },
  {
    field: "E9",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered?",
  },
  {
    field: "E10",
    headerName:
      "E.10 Based on your experience what suggestion would you like to make to the government to improve the emergency services in your district?",
  },
];

const PartFcolumns = [
  { field: "F1", headerName: "F.1 Name of the Head of the Household:" },
  { field: "F2", headerName: "F.2 Age (in Years):" },
  {
    field: "F3",
    headerName: "F.3 Sex:",
    valueGetter: (params) => params?.F3?.split(":")[0],
  },
  {
    field: "F3",
    headerName: "F.3 Sex: (Other Specify)",
    valueGetter: (params) => params?.F3?.split(":")[1],
  },
  {
    field: "F4",
    headerName: "F.4 Religion",
  },
  { field: "F5", headerName: "F.5 Caste" },
  {
    field: "F6",
    headerName: "F.6 Marital status:",
  },
  {
    field: "F7",
    headerName: "F.7 Level of education:",
  },
  {
    field: "F8",
    headerName: "F.8 Occupation:",
  },
  {
    field: "F9",
    headerName: "F.9 Total family Income per Month (in INR):",
  },
  {
    field: "F10_0",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = None)",
  },
  {
    field: "F10_1",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Two-Wheeler (Bicycle))",
  },
  {
    field: "F10_2",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Two-Wheeler (Motorcycle))",
  },
  {
    field: "F10_3",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Three-Wheeler (Manual Rickshaw, Auto rickshaw etc.))",
  },
  {
    field: "F10_4",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Four-Wheeler (Car/Jeep/etc.))",
  },
  {
    field: "F10_5",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Agricultural Vehicle (Tractor))",
  },
  {
    field: "F10_6",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Others)",
    valueGetter: (params) => params?.F10,
  },
  // {
  //   field: "F10_os",
  //   headerName:
  //     "F.10 What type of Transport facility available at home: (Other Specify)",
  //   valueGetter: (params) => params?.F10?.split(":")[1],
  // },
  {
    field: "F11",
    headerName: "F.11 Do you have any medical insurance?",
  },
  {
    field: "F12_0",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Private Insurance)",
  },
  {
    field: "F12_1",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Central Health Insurance Scheme (Ayushmaan Bharat))",
  },
  {
    field: "F12_2",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = State Health Insurance Scheme)",
  },
  {
    field: "F12_3",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Co-Payment)",
  },
  {
    field: "F12_4",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Community Health Insurance Programme)",
  },
  {
    field: "F12_5",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Employee based Insurance (ESI / CGHS/others))",
  },
  {
    field: "F13",
    headerName:
      "F.13 Are all your family members enrolled with the same Health Insurance coverage?",
  },
  {
    field: "F14",
    headerName:
      "F.14 How many of you or your family members have an individual medical/ health insurance scheme?",
  },
  {
    field: "F15",
    headerName: "F.15 Do you have a BPL card?",
  },
  {
    field: "F16",
    headerName: "F.16 Do you have ABHA ID?",
  },
  {
    field: "F17",
    headerName:
      "F.17 How many of your family members are enrolled with ABHA id?",
  },
  {
    field: "F18",
    headerName: "F.18 Type of Family",
  },
];

const PartGcolumns = [
  {
    field: "G1",
    headerName:
      "G. Based on your experience what suggestion would you like to make to the government to improve the emergency services in your district? (Open-ended)",
  },
];

const PartHcolumns = [
  { field: "H1", headerName: "H.1 Name of the Head of the Household:" },
  { field: "H2", headerName: "H.2 Age (in Years):" },
  { field: "H3", headerName: "H.3 Sex:" },
  { field: "H4", headerName: "H.4 Religion" },
  { field: "H5", headerName: "H.5 Caste" },
  {
    field: "H6",
    headerName: "H.6 Marital status: (Select the appropriate response):",
  },
  {
    field: "H7",
    headerName: "H.7 Level of education (Select the appropriate response):",
  },
  { field: "H8", headerName: "H.8 Occupation:" },
  {
    field: "H9",
    headerName: "H.9 Total family Income per Month (in INR):",
    valueGetter: (params) => params?.H9?.split(":")[0],
  },
  {
    field: "H9_other_specify",
    headerName: "H.9 Total family Income per Month (in INR): (other specify)",
    valueGetter: (params) => params?.H9?.split(":")[1],
  },
  {
    field: "H10_0",
    headerName:
      "H.10 What type of Transport facility available at home: ( choice = None)",
  },
  {
    field: "H10_1",
    headerName:
      "H.10 What type of Transport facility available at home: ( choice = Two-Wheeler (Bicycle))",
  },
  {
    field: "H10_2",
    headerName:
      "H.10 What type of Transport facility available at home: ( choice = Two-Wheeler (Motorcycle))",
  },
  {
    field: "H10_3",
    headerName:
      "H.10 What type of Transport facility available at home: ( choice = Three-Wheeler (Manual Rickshaw, Auto rickshaw etc.))",
  },
  {
    field: "H10_4",
    headerName:
      "H.10 What type of Transport facility available at home: ( choice = Four-Wheeler (Car/Jeep/ etc.))",
  },
  {
    field: "H10_5",
    headerName:
      "H.10 What type of Transport facility available at home: ( choice = Agricultural Vehicle (Tractor))",
  },
  {
    field: "H10_6",
    headerName:
      "H.10 What type of Transport facility available at home: ( choice = other)",
    valueGetter: (params) => params?.H10[6]?.split(":")[0],
  },
  {
    field: "H10_6_other_specify",
    headerName:
      "H.10 What type of Transport facility available at home: (other specify)",
    valueGetter: (params) => params?.H10[6]?.split(":")[1],
  },
  { field: "H11", headerName: "H.11 Do you have any medical insurance?" },
  {
    field: "H12_0",
    headerName:
      "H.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Private Insurance)",
  },
  {
    field: "H12_1",
    headerName:
      "H.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Central Health Insurance Scheme (Ayushmaan Bharat))",
  },
  {
    field: "H12_2",
    headerName:
      "H.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = State Health Insurance Scheme)",
  },
  {
    field: "H12_3",
    headerName:
      "H.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Community Health Insurance Programme)",
  },
  {
    field: "H12_4",
    headerName:
      "H.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Employee based Insurance (ESI / CGHS/others))",
  },
  {
    field: "H13",
    headerName:
      "H.13 Are all your family members enrolled with the same Health Insurance coverage?",
  },
  {
    field: "H14",
    headerName:
      "H.14 How many of you or your family members have an individual medical/ health insurance scheme?",
  },
  { field: "H15", headerName: "H.15 Do you have a BPL card?" },
  { field: "H16", headerName: "H.16 Do you have ABHA ID?" },
  {
    field: "H17",
    headerName:
      "H.17 How many of your family members are enrolled with ABHA id?",
  },
  { field: "H18", headerName: "H.18 Type of Family" },
];
