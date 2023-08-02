{
type: "FETCH_RESIDENT",
payload: {
id:'625c078035c74add65322835'
},
}
;

<!--
  // const addpage = (val) => {
  //   if (page + val > 1 && page + val <= flat_totalPage + 2) {
  //     setpage(val);
  //   }
  // };

  // const flat_details =
  //   useSelector((store) => store.flatInfo.flatAllDetails) || [];
  // const flat_totalPage =
  //   useSelector((store) => store.flatInfo.flat_totalPages) || 0;

  // const authState_form_store = useSelector((store) => store.login.authState);
  // console.log('authState_form_store:', authState_form_store)
  // const token_form_store = useSelector((store) => store.login.token);
  // console.log('token_form_store:', token_form_store)

  // if(!authState_form_store){
  //   return <Navigate to={'/login'}/>
  // }

  // useEffect(() => {
  //   // flatdetails that we got from backend
  //   gotAllFlatDetails();
  // }, [page]);

  // const gotAllFlatDetails = () => {
  //   axios
  //     .get(
  //       `https://appartment-manager-backend.onrender.com/flat?page=${page}&size=${size}`
  //     )
  //     .then(({ data }) => {
  //       console.log("data:", data);
  //       dispatch(flatDetails(data.flat));
  //       dispatch(flatTotalPages(data.totalPage));
  //     });
  // };

  // const sort_flatNo_handleOnchange = (flat) => {
  //   // setsortFlatNo(flat.target.value)
  //   let sortValue = flat.target.value;
  //   // console.log('sortValue:', sortValue)
  //   setpage(1);
  //   axios
  //     .get(
  //       `https://appartment-manager-backend.onrender.com/flat/sortBy/${sortValue}?page=${page}&size=${size}`
  //     )
  //     .then(({ data }) => {
  //       console.log("pageaftersort:", page);
  //       console.log("data sorted:", data);
  //       dispatch(flatDetails(data.flat));
  //       dispatch(flatTotalPages(data.totalPage));
  //     });
  // };

 -->
