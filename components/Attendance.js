import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
//import DatePicker from 'react-native-date-picker';
import Octicons from 'react-native-vector-icons/Octicons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import TableStudent from './TableStudent';
const Attendance = props => {
  //tìm kiếm
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  //chọn ngày
  const [date, setDate] = useState(new Date());
  const [isShow, setIsShow] = useState(false);
  // console.log(`date`, date);
  //console.log(`isShow`, isShow);
  //tìm kiếm học sinh
  useEffect(() => {
    if (searchInput == '') {
      setSearchResult(props.students);
    } else {
      let result = findName(searchInput);
      //console.log(`result`, result);
      setSearchResult(result);
    }
  }, [searchInput]);
  const findName = strSearch => {
    let result = [];
    props.students.forEach(element => {
      if (element.name.includes(strSearch)) {
        result.push(element);
      } else if (element.phoneNumber.includes(strSearch)) {
        result.push(element);
      }
    });
    return result;
  };
  //đánh dấu nghỉ học
  const m_nghiHoc = async (id, status) => {
    //await m_nghiHoc(id, status);
  };
  const setNewDate = (event, date) => {
    setIsShow(false);
    if (date !== undefined) {
      setDate(date);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            setIsShow(true);
          }}
          activeOpacity={0.9}
          style={{
            marginHorizontal: 20,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 2,
            borderRadius: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 7,
              marginHorizontal: 8,
            }}>
            <Text style={{fontSize: 24}}>
              {date.toUTCString().slice(0, 17)}
            </Text>
            <Octicons name="calendar" size={26} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: 0}}>
        <TextInput
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'black',
            marginHorizontal: 20,
          }}
          placeholder={'Nhập tên hoặc SĐT của học sinh'}
          onChangeText={text => {
            setSearchInput(text);
          }}
        />
      </View>
      <ScrollView>
        <TableStudent students={searchResult} nghiHoc={m_nghiHoc} />
      </ScrollView>
      {isShow ? (
        <RNDateTimePicker
          mode={'date'}
          value={date}
          onChange={
            //console.log(`date`, date);
            // console.log(
            //   `date.nativeEvent.timestamp`,
            //   typeof date.nativeEvent.timestamp,
            // );

            // let newDate = date.nativeEvent.timestamp;
            // setDate(newDate);
            setNewDate
          }
        />
      ) : null}
    </View>
  );
};
export default Attendance;
