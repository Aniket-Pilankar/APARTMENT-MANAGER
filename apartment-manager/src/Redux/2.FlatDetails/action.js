export const FLAT_DETAILS = "FLAT_DETAILS";
export const FLAT_TOTALPAGES = "FLAT_TOTALPAGES"

export const flatDetails = (data) => ({type:FLAT_DETAILS,payload:data})

export const flatTotalPages = (data) => ({type:FLAT_TOTALPAGES,payload:data})