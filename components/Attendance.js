import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import TableStudent from './TableStudent';
const Attendance = props => {
  const [date, setDate] = useState(new Date());
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');

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
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <DatePicker mode={'date'} date={date} onDateChange={setDate} />
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
    </View>
  );
};
export default Attendance;
