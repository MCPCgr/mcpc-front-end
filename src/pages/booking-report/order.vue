<template>
    <div class="container">
      <portal to="header-left">
        <div class="page-title float-left">
          <div class="float-left pt-3">
            <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Захиалга</h1>
            <h2 class="text-gray-400 text-xs m-0"><span>Цаг захиалга</span></h2>
          </div>
        </div>
      </portal>
      <div class="w-full rounded-2xl gap-5 bg-white my-[10px] px-[30px] py-[20px] flex-none 2xl:flex">
        <a-space class="mr-[10px] mb-[10px] grid grid-cols-1 text-wrap w-[300px]">
          <label class="text-[12px]">Захиалгат огноо</label>
          <a-space direction="vertical" :size="12">
            <a-date-picker class="w-[300px]" placeholder="Захиалгат огноо" v-model:value="selected_date_time" @change="dateChange"/>
          </a-space>
        </a-space>
      </div>

      <div class="mx-auto mt-[20px]">
        <div class="w-full">
          <div class="flex mb-[100px] text-black overflow-hidde overflow-x-auto " >

            <div class="border border-gray-800">
              <div class="w-[80px]">
                <div class=" h-[50px] bg-gray-100 flex items-center border-b border-gray-800">
                  <p class="mx-auto"> Цаг </p>
                </div>
                <div v-for="(item, index) in schedule_rendered" class="w-[80px] h-[60px] border-b border-gray-300 flex items-center bg-gray-100">
                  <p class="mx-auto">{{ item }}</p>
                </div>
              </div>
            </div>

            <div class="border-b border-gray-800 bg-white" v-for="(item, index) in workers_schedule">
              <div class="w-[120px] border-r border-gray-800">
                <div class=" h-[51px] bg-gray-100 p-[5px] border-t border-b border-gray-800 flex items-center">
                  <p class="text-[14px] mx-auto">{{item.first_name}}</p>
                </div>

                <div class="w-full h-[1px]"/>
                <div v-for="(timing, index) in item.data_status" class="m-0 p-0">
                  <div v-if="(index - 1) > (schedule.opening_time)"
                       @click="selectOrderTime(timing)"
                       :class="'w-[120px] h-[1px] border-r border-gray-500 '
                       + (timing.status === 'ordered' ? ' bg-green-500 ' : ' ') +
                        (index % 60 === 0 ? ' border-b  border-gray-300 ' : ' ')">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a-modal v-model:open="showModalOrder" :footer="null" :closeIcon="false" :after-close="handleOk"  :mask-closable="true" :keyboard="false">
        <div class="w-full items-center">
          <p class="flex justify-center my-[20px] text-[24px]">Захиалга үүсгэх</p>

          <div class="w-full mt-[30px]">
            <p class="text-[16px]">Артист: {{selected_artist_first_name}}</p>
          </div>


          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 my-[15px]">

            <div @click="mutationSelectedMinute('00')"
                 :class="'border border-gray-200 h-[50px] rounded-2xl flex items-center hover:bg-gray-100 cursor-pointer ' +
                  (mutation_selected_minute === '00' ? ' bg-primary-color text-white ' : '  bg-none text-black ') ">
              <span class="mx-auto">{{mutation_selected_hour}}:00</span>
            </div>

            <div @click="mutationSelectedMinute('10')"
                 :class="'border border-gray-200 h-[50px] rounded-2xl flex items-center hover:bg-gray-100 cursor-pointer ' +
                  (mutation_selected_minute === '10' ? ' bg-primary-color text-white ' : '  bg-none text-black ')
             ">
              <span class="mx-auto">{{mutation_selected_hour}}:10</span>
            </div>
            <div @click="mutationSelectedMinute('20')"
                 :class="'border border-gray-200 h-[50px] rounded-2xl flex items-center hover:bg-gray-100 cursor-pointer ' +
                  (mutation_selected_minute === '20' ? ' bg-primary-color text-white ' : '  bg-none text-black ')
             ">
              <span class="mx-auto">{{mutation_selected_hour}}:20</span>
            </div>
            <div @click="mutationSelectedMinute('30')"
                 :class="'border border-gray-200 h-[50px] rounded-2xl flex items-center hover:bg-gray-100 cursor-pointer ' +
                  (mutation_selected_minute === '30' ? ' bg-primary-color text-white ' : '  bg-none text-black ')
             ">
              <span class="mx-auto">{{mutation_selected_hour}}:30</span>
            </div>
            <div @click="mutationSelectedMinute('40')"
                 :class="'border border-gray-200 h-[50px] rounded-2xl flex items-center hover:bg-gray-100 cursor-pointer ' +
                  (mutation_selected_minute === '40' ? ' bg-primary-color text-white ' : '  bg-none text-black ') ">
              <span class="mx-auto">{{mutation_selected_hour}}:40</span>
            </div>
            <div @click="mutationSelectedMinute('50')"
                 :class="'border border-gray-200 h-[50px] rounded-2xl flex items-center hover:bg-gray-100 cursor-pointer ' +
                  (mutation_selected_minute === '50' ? ' bg-primary-color text-white ' : '  bg-none text-black ') ">
              <span class="mx-auto">{{mutation_selected_hour}}:50</span>
            </div>
          </div>

            <a-space class="mr-[10px] mb-[10px] grid grid-cols-1">
              <label class="text-[16px]">Үйлчилгээний төрөл</label>
              <a-select ref="select"  v-model:value="selected_category_id"  @change="getServiceCategoryByCatIdData" class="w-full" >
                <a-select-option v-for="(item, index) in categories_list" :value="item.id">{{item.service_category}}</a-select-option>
              </a-select>
            </a-space>

            <a-space class="mr-[10px] mb-[10px] grid grid-cols-1 text-wrap">
              <label class="text-[16px]">Үйлчилгээ</label>
              <a-select ref="select" v-model:value="selected_service_id" class="w-full">
                <a-select-option v-for="(item, index) in services_list" :value="item.service_id">
                  <div class="w-[400px] min-h-[60px] mb-[10px]">
                    <p class="font-semibold"> {{item.service_name}} </p>
                    <p class="ml-[15px] text-[12px] text-wrap "> {{item.service_description}} </p>
                    <p class="font-semibold"> {{item.duration_minute}} минут. {{item.price}}₮</p>
                  </div>
                </a-select-option>
              </a-select>
            </a-space>

            <a-space class="mr-[10px] my-[20px] grid grid-cols-1">
              <label class="text-[16px]"> Утасны дугаар </label>
              <a-input @keypress="isNumber($event)" :maxlength="8" v-model:value="phone_number" @change="mutationCheck" class="w-full text-[16px] mb-[15px]" placeholder="Утасны дугаар" />
            </a-space>
          <a-space class="mx-auto my-[15px] flex justify-center">

            <a-button
              v-if="mutation_check === true"
              type="primary"
              class="w-[200px] rounded-lg h-[45px] rounded-lg text-[20px] font-bold border-none hover:opacity-75"
              @click="bookingOrderCreate" >
              <span>Захиалах</span>
            </a-button>

            <a-button
              v-else
              disabled
              type="primary"
              class="w-[200px] rounded-lg h-[45px] rounded-lg text-[20px] font-bold border-none hover:opacity-75">
              <span>Захиалах</span>
            </a-button>


          </a-space>


        </div>
      </a-modal>

    </div>
</template>

<script setup>
  import {ref} from "vue"
  import dayjs from "dayjs"
  import moment from "moment"
  import { message } from 'ant-design-vue';

  import {userInfo} from "~/store/useSiteSettings";
  import {isNumber} from "~/components/Booking/BookingUtils"
  import {
    getServiceCategory,
    mutationCreateOrderDetail,
    mutationCreateBookingOrder,
    getArtistByBranch,
    getOrderDetailTiming,
    getServiceTiming,
    getBranchBooking,
    getServiceCategoryByArtist,
    getServiceCategoryByArtistWhereIn, getServiceCategoryByCatId
  } from "~/graphql/fetch";
  import { Dayjs } from 'dayjs';

  const user_id = userInfo.value.id;
  const emp_id = userInfo.value.emp_id;
  const company_id = userInfo.value.company_id;
  const struct_id = userInfo.value.struct_id;
  const schedule = ref({opening_time: 360, closing_time: 1200});

  const showModalOrder = ref(false);
  const mutation_selected_minute = ref('');
  const mutation_selected_hour = ref('');
  const mutation_selected_date_full = ref('');
  const mutation_selected_yyyy_mm_dd = ref('');
  const mutation_selected_hh_mm = ref('');

  const mutation_check = ref(false);
  const selected_branch_id = ref('');
  const selected_category_id = ref('');
  const selected_service_id = ref('');
  const selected_artist_id = ref('');
  const selected_artist_first_name = ref('');
  const selected_date_time = ref(dayjs());
  const phone_number = ref('');

  const categories_list = ref([]);
  const services_list = ref([]);

  const booking_order_body = ref({}); // mutation body

  const artists_data = ref([]); //got schedule data from database
  const workers_schedule = ref([]); // schedule genereted variables
  const handleOk = ()=>clear();

  function dateChange(){
    getArtistByBranchData();
    mutationCheck();
  }

  function selectOrderTime(timing){

    getServiceCategoryByArtistData(timing.artist.id);

    selected_artist_id.value = timing.artist.id;
    selected_artist_first_name.value = timing.artist.first_name;

    let temp = '';
    ((timing.minute / 60) < 10) ? (temp = "0"+ timing.minute/60) : (temp = ""+timing.minute/60)
    mutation_selected_hour.value = temp.substring(0, 2);
    let hh_mm = ''
    if ((timing.minute%60) < 10){
      hh_mm = (mutation_selected_hour.value) +':0' + (timing.minute%60);
      mutation_selected_minute.value = '00';
      mutationSelectedMinute(mutation_selected_minute.value)
    }
    else {
      hh_mm = (mutation_selected_hour.value) + ':' + (timing.minute%60);
      mutation_selected_minute.value = (((timing.minute%60)+'').substring(0, 1))+'0';
      mutationSelectedMinute(mutation_selected_minute.value)
    }

    if (timing.status === "ordered"){
      message.warn("Үүссэн захиалга!");
      // message.warn(mutation_selected_hour.value + ":" +mutation_selected_minute.value);


      // let service_date = dayjs(selected_date_time.value).format('YYYY-MM-DD');
      // let service_time = mutation_selected_hour.value + ":" +mutation_selected_minute.value;

      // console.log(selected_artist_id.value, service_date, service_time);
      // if (getOrderDetailTimingCheckExistData(selected_artist_id.value, service_date, service_time)) {
      //   message.success("uu baina");
      // }

    } else {
      showModalOrder.value = true;
    }
  }
  function mutationSelectedMinute(sel_min){
    mutation_selected_minute.value = sel_min;
    mutation_selected_yyyy_mm_dd.value = dayjs(selected_date_time.value).format('YYYY-MM-DD');
    mutation_selected_date_full.value = (dayjs(selected_date_time.value).format('YYYY-MM-DD')) +"T" + (mutation_selected_hour.value+":"+sel_min)+":00Z";
    mutation_selected_hh_mm.value = mutation_selected_hour.value+":"+sel_min;
    mutationCheck();
  };
  function classifyTimesBodyBuild(value){
    // console.log("value value value >>> ", value);
    const result = {};
    // const result = {
    //   start_minute: 0,
    //   end_minute: 0,
    //   start_time: value.service_date_time,
    //   end_time: "",
    // };
    const startTime = moment(value.service_date +"T00:00:00Z");
    const endTime = moment(value.service_date_time);
    result.start_minute = endTime.diff(startTime, 'minutes');

      result.end_minute = result.start_minute + value.duration_minute;
      const temp_start_time = moment(value.service_date_time);
      result.end_time =  dayjs( temp_start_time.add(value.duration_minute, 'minutes')).format('YYYY-MM-DDTHH:mm:ss[Z]');

    return result;
  };

  function classifyTimes(value){
    // console.log(value)
    const temp =[];
    value.forEach((item, index)=>{ temp.push(classifyTimesBodyBuild(item)) });
    return temp;
  };


  async function getArtistByBranchData(){
    //1.  salbart xaryalagdax artist uudiig awaad (DONE!)
    //2.  awsan artistuudiin id gaar orders uudaa awaad dotor ni bga service_id nuudaa salgaj awna (DONE!)
    //3.  service_id nuudaa awsan bol service_timing table ees timing uudaa awna
    //4.  timing-> service duration minute -> orders -> artist gesen darallaar tootsoolxod xeregtei body ugsaraad awsan bol CALCULATE ee xiij exlene
    //5.  schedule zurj bga body struct ruugaa xurwvvlex tootsoololoo xiinervice_id nuudaa salgaj awna (DONE!)
    //3.  service_id nuudaa awsan bol service_timing table ees timing uudaa
    //6.  artist bolgon dr neg negeer ni xiine
    //6.1 xiij duusaad zurna !!!
    let selected_day = dayjs(selected_date_time.value).format('YYYY-MM-DD');
   const  data  =  await getArtistByBranch(selected_branch_id.value, selected_day, emp_id);

    if(data.view_artist && data.view_artist.length){
      artists_data.value = data.view_artist.map((artist) => {
        if(data.view_order_detail_timing && data.view_order_detail_timing.length) {
          const preArtistOrders = data.view_order_detail_timing.filter(order => order.artist_id === artist.id);
          const artisOrders = preArtistOrders.map(artistOrder=>{
            if(data.view_service_timing && data.view_service_timing.length) {
              return {...artistOrder, serviceTiming: data.view_service_timing.filter(serviceTime => serviceTime.service_id && artistOrder.service_id) }
            }
            return {...artistOrder, serviceTiming:[]}
          })
          return {
            ...artist,
            times: classifyTimes(artisOrders),
            orders: artisOrders,
          }
        } else {
          return {
            ...artist,
            times: [],
            order:[]
          }
        }
      })
      workersSchedule();
    }
  }

  async function getOrderDetailTimingCheckExistData(artist_id, service_date, service_time){
    let temp = false;
    const data = await getOrderDetailTiming(artist_id, service_date, service_time);
    if(data.view_order_detail_timing && data.view_order_detail_timing.length){
      // console.log("data.view_order_detail_timing >>>> ", data.view_order_detail_timing );
      temp = true;
    }
    return temp;
  }

  async function getServiceTimingData(service_id) {
    const data = await getServiceTiming(service_id);
    if (data.service_timing && data.service_timing.length) {
      return data.service_timing;
    } else {
      return [];
    }
  }

  // SELECTS FILL PART
  function getBranchData(){
    getBranchBooking(struct_id).then(data=>{

      if(data.branches && data.branches.length){
        selected_branch_id.value = data.branches[0].id;
        getArtistByBranchData(); // schedule table data fill
      }
    })
  }
  function getServiceCategoryByArtistData(artist_id){
    getServiceCategoryByArtist(artist_id).then(data=>{
      if(data.view_artist_services_skills && data.view_artist_services_skills.length){
        let temp = ''
          data.view_artist_services_skills.forEach((services, index)=>{
            temp = temp + (services.service_category_id) + ",";
          })
        temp = temp.substring(0, temp.length - 1);
        getServiceCategoryByArtistDataWhereIn(temp);
      }
    })
  }

  function getServiceCategoryByArtistDataWhereIn(cats_id){
    getServiceCategoryByArtistWhereIn(cats_id).then(data=>{
      if(data.view_service_category && data.view_service_category.length){
        categories_list.value = data.view_service_category;
      }
    })
  }

  function getServiceCategoryByCatIdData(cat_id){
    getServiceCategoryByCatId(cat_id).then(data=>{
      if(data.view_artist_services_skills && data.view_artist_services_skills.length){
        services_list.value = data.view_artist_services_skills;
        mutationCheck();
      }
    })
  }

  function clear(){
    services_list.value = [];
    selected_category_id.value = '';
    selected_service_id.value = '';
    selected_artist_id.value = '';

    mutation_selected_minute.value = '';
    mutation_selected_hour.value = '';
    mutation_selected_date_full.value = '';
    mutation_selected_hh_mm.value = '';
    mutation_selected_yyyy_mm_dd.value = '';

    phone_number.value = '';
    getArtistByBranchData(); // schedule table data fill
  };

  // MUTATION MUTATION MUTATION MUTATION MUTATION
  function orderCreate(order_id){
      const order_detail_body = ref( {
        service_id: selected_service_id.value,
        service_category_id: selected_category_id.value,
        artist_id: selected_artist_id.value,
        branch_id: selected_branch_id.value,
        service_date: mutation_selected_yyyy_mm_dd.value,
        service_time: mutation_selected_hh_mm.value,
        service_date_time: mutation_selected_date_full.value,
        order_id: order_id,
        service_price: 0,
        prepayment: 0,
        registered_emp_id: emp_id
      })

      // console.log("order_detail_body.value order_detail_body.value order_detail_body.value >>> ", order_detail_body.value)
      // console.log("order_detail_body.value order_detail_body.value order_detail_body.value >>> ", order_detail_body.value)
      // console.log("order_detail_body.value order_detail_body.value order_detail_body.value >>> ", order_detail_body.value)

      mutationCreateOrderDetail(order_detail_body.value).then(data=>{
          if(data.createOrderDetail){
            message.success('Захиалга амжилттай!');
            clear();
          }
      })
  };

  function bookingOrderCreate(){
      booking_order_body.value = {
        cash_amount: 0,
        company_id: company_id,
        is_received: 0,
        non_cash_amount: 0,
        order_number: orderNumberGenerator(),
        payment_status: "success",
        phone_number: phone_number.value,
        qpay_invoice_id: "",
        total_prepayment: 0,
        total_price: 0,
        user_id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
      }

      mutationCreateBookingOrder(booking_order_body.value).then(data=>{
        if(data.createBookingOrders){
          orderCreate(data.createBookingOrders.id);
          showModalOrder.value = false;
        }
      })
  };

  const mutationCheck = () => {
    if (selected_category_id.value !== '' && selected_service_id.value  !== '' && phone_number.value.length === 8 && mutation_selected_date_full.value !== ''){
      mutation_check.value = true;
    } else { mutation_check.value = false; }
  };

  function orderNumberGenerator(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let temp = (moment(moment.now()).format("YY-MM-DD HH:mm:ss")).replaceAll("-", "");
    temp = temp.replaceAll(" ", "");
    temp = temp.replaceAll(":", "");
    let mask_character = '';
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      mask_character += characters.charAt(randomIndex);
    }
    temp = mask_character + "-" + temp;
    return temp;
  }

  //schedule table calculate part
  //schedule table calculate part
  //schedule table calculate part

  const schedule_rendered = ref([]);
  function minuteCalculate() {
    for (let i = schedule.value.opening_time; i < 1440; i++){
      let temp = '';
      if (i % 60 === 0 ){
        temp = ((i / 60) < 10 ? ('0'+ ((i / 60))) : (i / 60 ));
        schedule_rendered.value.push((temp) + ":00");
      }
    }
  };

  function workersSchedule(){
    workers_schedule.value =[];

    workers_schedule.value = artists_data.value.map((artist, index)=>{
     return {
       ...artist,
       t_length: 1200,
       loading: false,
       data_status: workersScheduleCalculate(artist)
     }
    });
  // console.log(workers_schedule.value)
    // console.log(artists_data.value.map((artist, index)=>{
    //   return {
    //     ...artist,
    //     t_length: 1200,
    //     loading: false,
    //     data_status: workersScheduleCalculate(artist)
    //   }
    // }))
  };

  function workersScheduleCalculate(artist){
    const times = artist.times
    let build_body = [];
    for(let i=0; i < 1440; i++){
      build_body.push( {status: "null", minute: i, artist: artist	});
    }
    times.forEach((item, index)=>{
      for(let i = item.start_minute; i <  item.end_minute; i++){
        build_body[i].status = "ordered";
      }
    })
    return build_body;
  };

  onMounted(()=>{
    getBranchData();
    minuteCalculate();
    // console.log(userInfo.value)
  })
</script>
<style></style>
