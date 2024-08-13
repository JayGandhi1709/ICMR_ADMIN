const mapAmbulanceRow = () => ({
  AMBid: row._id,
  form: row.formUniqueCode?.split(":")?.[0],
  formUniqueCode: row.formUniqueCode?.split(":")?.[1],
  AMB2: row.AMB2,
  AMB1: row.uniqueCode,
  AMB3: row.AMB3,
  AMB4_0: row.AMB4?.latitude,
  AMB4_1: row.AMB4?.longitude,
  AMB4_2: row.AMB4?.district,
  AMB4_3: row.AMB4?.state,
  AMB5: row.AMB5,
  AMB6: row.AMB6,
  AMB7: row.AMB7,
  AMB8: row.AMB8,
  AMB9: row.AMB9,
  AMB10: row.AMB10,
  AMB11: row.AMB11,
  AMB12_0: row.AMB12?.[0],
  AMB12_1: row.AMB12?.[1],
  AMB12_2: row.AMB12?.[2],
  AMB12_3: row.AMB12?.[3],
  AMB12_4: row.AMB12?.[4],
  AMB12_5: row.AMB12?.[5],
  AMB13_0: row.AMB13,
  // AMB13_0:
  //   row.AMB13 == "Portable or Mounted Suction Machine" ? row.AMB13 : "",
  // AMB13_1:
  //   row.AMB13 == "Flexible suction catheters Fr. 5,8,12 and 14"
  //     ? row.AMB13
  //     : "",
  // AMB13_2: row.AMB13 == "Both of the above" ? row.AMB13 : "",
  // AMB13_3: row.AMB13 == "None of the above" ? row.AMB13 : "",
  AMB14_0: row.AMB14,
  // AMB14_0:
  //   row.AMB14 == "Portable oxygen tank with regulator" ? row.AMB14 : "",
  // AMB14_1:
  //   row.AMB14 == "Oxygen mask No. 2,3 and 4 (for new-born, infant and adult)"
  //     ? row.AMB14
  //     : "",
  // AMB14_2: row.AMB14 == "Both of the above" ? row.AMB14 : "",
  // AMB14_3: row.AMB14 == "None of the above" ? row.AMB14 : "",
  AMB15: row.AMB15,
  AMB16_0_Available: row.AMB16?.[0]?.Available,
  AMB16_0_Functional: row.AMB16?.[0]?.Functional,
  AMB16_0_LastUsed: row.AMB16?.[0]?.LastUsed,
  AMB16_1_Available: row.AMB16?.[1]?.Available,
  AMB16_1_Functional: row.AMB16?.[1]?.Functional,
  AMB16_1_LastUsed: row.AMB16?.[1]?.LastUsed,
  AMB16_2_Available: row.AMB16?.[2]?.Available,
  AMB16_2_Functional: row.AMB16?.[2]?.Functional,
  AMB16_2_LastUsed: row.AMB16?.[2]?.LastUsed,
  AMB16_3_Available: row.AMB16?.[3]?.Available,
  AMB16_3_Functional: row.AMB16?.[3]?.Functional,
  AMB16_3_LastUsed: row.AMB16?.[3]?.LastUsed,
  AMB16_4_Available: row.AMB16?.[4]?.Available,
  AMB16_4_Functional: row.AMB16?.[4]?.Functional,
  AMB16_4_LastUsed: row.AMB16?.[4]?.LastUsed,
  AMB16_5_Available: row.AMB16?.[5]?.Available,
  AMB16_5_Functional: row.AMB16?.[5]?.Functional,
  AMB16_5_LastUsed: row.AMB16?.[5]?.LastUsed,
  AMB16_6_Available: row.AMB16?.[6]?.Available,
  AMB16_6_Functional: row.AMB16?.[6]?.Functional,
  AMB16_6_LastUsed: row.AMB16?.[6]?.LastUsed,
  AMB16_7_Available: row.AMB16?.[7]?.Available,
  AMB16_7_Functional: row.AMB16?.[7]?.Functional,
  AMB16_7_LastUsed: row.AMB16?.[7]?.LastUsed,
  AMB16_8_Available: row.AMB16?.[8]?.Available,
  AMB16_8_Functional: row.AMB16?.[8]?.Functional,
  AMB16_8_LastUsed: row.AMB16?.[8]?.LastUsed,
  AMB16_9_Available: row.AMB16?.[9]?.Available,
  AMB16_9_Functional: row.AMB16?.[9]?.Functional,
  AMB16_9_LastUsed: row.AMB16?.[9]?.LastUsed,
  AMB16_10_Available: row.AMB16?.[10]?.Available,
  AMB16_10_Functional: row.AMB16?.[10]?.Functional,
  AMB16_10_LastUsed: row.AMB16?.[10]?.LastUsed,
  AMB16_11_Available: row.AMB16?.[11]?.Available,
  AMB16_11_Functional: row.AMB16?.[11]?.Functional,
  AMB16_11_LastUsed: row.AMB16?.[11]?.LastUsed,
  AMB16_12_Available: row.AMB16?.[12]?.Available,
  AMB16_12_Functional: row.AMB16?.[12]?.Functional,
  AMB16_12_LastUsed: row.AMB16?.[12]?.LastUsed,
  AMB16_13_Available: row.AMB16?.[13]?.Available,
  AMB16_13_Functional: row.AMB16?.[13]?.Functional,
  AMB16_13_LastUsed: row.AMB16?.[13]?.LastUsed,
  AMB16_14_Available: row.AMB16?.[14]?.Available,
  AMB16_14_Functional: row.AMB16?.[14]?.Functional,
  AMB16_14_LastUsed: row.AMB16?.[14]?.LastUsed,
  AMB16_15_Available: row.AMB16?.[15]?.Available,
  AMB16_15_Functional: row.AMB16?.[15]?.Functional,
  AMB16_15_LastUsed: row.AMB16?.[15]?.LastUsed,
  AMB16_16_Available: row.AMB16?.[16]?.Available,
  AMB16_16_Functional: row.AMB16?.[16]?.Functional,
  AMB16_16_LastUsed: row.AMB16?.[16]?.LastUsed,
  AMB16_17_Available: row.AMB16?.[17]?.Available,
  AMB16_17_Functional: row.AMB16?.[17]?.Functional,
  AMB16_17_LastUsed: row.AMB16?.[17]?.LastUsed,
  AMB16_18_Available: row.AMB16?.[18]?.Available,
  AMB16_18_Functional: row.AMB16?.[18]?.Functional,
  AMB16_18_LastUsed: row.AMB16?.[18]?.LastUsed,
  AMB16_19_Available: row.AMB16?.[19]?.Available,
  AMB16_19_Functional: row.AMB16?.[19]?.Functional,
  AMB16_19_LastUsed: row.AMB16?.[19]?.LastUsed,
  AMB16_20_Available: row.AMB16?.[20]?.Available,
  AMB16_20_Functional: row.AMB16?.[20]?.Functional,
  AMB16_20_LastUsed: row.AMB16?.[20]?.LastUsed,
  AMB17_0_Available: row.AMB17?.[0]?.Available,
  AMB17_1_Available: row.AMB17?.[1]?.Available,
  AMB17_2_Available: row.AMB17?.[2]?.Available,
  AMB17_3_Available: row.AMB17?.[3]?.Available,
  AMB17_4_Available: row.AMB17?.[4]?.Available,
  AMB17_5_Available: row.AMB17?.[5]?.Available,
  AMB17_6_Available: row.AMB17?.[6]?.Available,
  AMB17_7_Available: row.AMB17?.[7]?.Available,
  AMB17_8_Available: row.AMB17?.[8]?.Available,
  AMB17_9_Available: row.AMB17?.[9]?.Available,
  AMB17_10_Available: row.AMB17?.[10]?.Available,
  AMB17_11_Available: row.AMB17?.[11]?.Available,
  AMB17_12_Available: row.AMB17?.[12]?.Available,
  AMB17_13_Available: row.AMB17?.[13]?.Available,
  AMB17_14_Available: row.AMB17?.[14]?.Available,
  AMB17_15_Available: row.AMB17?.[15]?.Available,
  AMB17_16_Available: row.AMB17?.[16]?.Available,
  AMB17_17_Available: row.AMB17?.[17]?.Available,
  AMB17_18_Available: row.AMB17?.[18]?.Available,
  AMB17_19_Available: row.AMB17?.[19]?.Available,
  AMB17_20_Available: row.AMB17?.[20]?.Available,
  AMB17_21_Available: row.AMB17?.[21]?.Available,
  AMB17_22_Available: row.AMB17?.[22]?.Available,
  AMB17_23_Available: row.AMB17?.[23]?.Available,
  AMB17_24_Available: row.AMB17?.[24]?.Available,
  AMB17_25_Available: row.AMB17?.[25]?.Available,
  AMB17_26_Available: row.AMB17?.[26]?.Available,
  AMB17_27_Available: row.AMB17?.[27]?.Available,
  AMB17_28_Available: row.AMB17?.[28]?.Available,
  AMB17_29_Available: row.AMB17?.[29]?.Available,
  AMB17_30_Available: row.AMB17?.[30]?.Available,
  AMB17_31_Available: row.AMB17?.[31]?.Available,
  AMB17_32_Available: row.AMB17?.[32]?.Available,
  AMB17_33_Available: row.AMB17?.[33]?.Available,
  AMB17_34_Available: row.AMB17?.[34]?.Available,
  AMB17_35_Available: row.AMB17?.[35]?.Available,
  AMB17_36_Available: row.AMB17?.[36]?.Available,
  AMB17_37_Available: row.AMB17?.[37]?.Available,
  AMB17_38_Available: row.AMB17?.[38]?.Available,
  AMB17_39_Available: row.AMB17?.[39]?.Available,
  AMB18_0: row.AMB18?.[0],
  AMB18_1: row.AMB18?.[1],
  AMB18_2: row.AMB18?.[2],
  AMB18_3: row.AMB18?.[3],
  AMB18_4: row.AMB18?.[4],
  AMB18_5: row.AMB18?.[5],
  AMB18_6: row.AMB18?.[6],
  AMB19_0: row.AMB19?.[0],
  AMB19_1: row.AMB19?.[1],
  AMB19_2: row.AMB19?.[2],
  AMB19_3: row.AMB19?.[3],
  AMB19_4: row.AMB19?.[4],
  AMB19_5: row.AMB19?.[5],
  AMB19_6: row.AMB19?.[6],
  AMB19_7: row.AMB19?.[7],
  AMB19_8: row.AMB19?.[8],
});

export const AmbulanceRows = (data) => {
  console.log(!Array.isArray(data));
  if (!Array.isArray(data)) {
    console.log(data);
    return (data = [data]); // Convert single data to an array
  }

  return data.map(mapAmbulanceRow);
};
