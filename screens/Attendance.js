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
import TableStudent from '../components/table/TableStudent';
import {getAllStudents, nghiHoc} from '../realm';
import {useIsFocused} from '@react-navigation/native';
const Attendance = props => {
  const isFocused = useIsFocused();
  const [students, setStudents] = useState([]);
  //tìm kiếm
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  //chọn ngày
  const [date, setDate] = useState(new Date());
  const [isShow, setIsShow] = useState(false);
  //console.log(`date`, date);
  //console.log(`isShow`, isShow);
  useEffect(() => {
    if (isFocused) m_getAllStudents();
  }, [isFocused]);
  //tìm kiếm học sinh
  useEffect(() => {
    if (searchInput == '') {
      setSearchResult(students);
    } else {
      let result = findName(searchInput);
      //console.log(`result`, result);
      setSearchResult(result);
    }
  }, [searchInput]);
  //lấy danh sách học sinh
  const m_getAllStudents = async () => {
    let allStudents = await getAllStudents(props.classId);
    //console.log(`allStudents`, allStudents);
    setStudents(allStudents);
    setSearchResult(allStudents);
  };
  const findName = strSearch => {
    let result = [];
    students.forEach(element => {
      if (element.name.includes(strSearch)) {
        result.push(element);
      } else if (element.phonenumber.includes(strSearch)) {
        result.push(element);
      }
    });
    return result;
  };
  //đánh dấu nghỉ học
  const m_nghiHoc = async (id, status) => {
    await nghiHoc(id, status, date.toUTCString().slice(0, 16));
  };
  const setNewDate = (event, date) => {
    setIsShow(false);
    if (date !== undefined) {
      setDate(date);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 10}}>
        <TouchableOpacity
          onPress={() => {
            setIsShow(true);
          }}
          activeOpacity={0.9}
          style={{
            marginHorizontal: 10,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            borderRadius: 8,
            backgroundColor: '#fff',
            shadowOpacity: 0.25,
            shadowRadius: 1,
            elevation: 3,
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
              {date.toUTCString().slice(0, 16)}
            </Text>
            <Octicons name="calendar" size={26} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginTop: 10,
          flex: 1,
        }}>
        <View style={{marginBottom: 0}}>
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: 'black',
              marginHorizontal: 20,
              color: '#000',
            }}
            placeholder={'Nhập tên hoặc SĐT của học sinh'}
            onChangeText={text => {
              setSearchInput(text);
            }}
          />
        </View>
        <TableStudent students={searchResult} nghiHoc={m_nghiHoc} date={date} />
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
    </View>
  );
};
export default Attendance;
