import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {STATE_STUDENT} from '../constants';
import {getStudent} from '../realm';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const date_nghi_co_phep = {
  date: 'Wed, 14 Jun 2017',
  count: STATE_STUDENT.NGHI_PHEP,
};
const date_nghi_khong_phep = {
  date: 'Thu, 15 Jun 2017',
  count: STATE_STUDENT.NGHI_KHONG_PHEP,
};
const StudentInfor = props => {
  const scrollView = useRef(null);
  const scrollHori = useRef(null);
  const [student, setStudent] = useState({
    _id: 1,
    name: '',
    phoneNumber: '',
    avatar: '',
    class: {
      _id: 1,
      name: '',
      year: '',
      teacher: {
        name: '',
      },
    },
    dayOff: [{}],
  });
  const [dayOff, setDayOff] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const date = new Date();
  useEffect(() => {
    scrollHori.current.scrollToEnd({animated: true});
    m_getStudent();
  }, []);
  useEffect(() => {
    if (searchInput == '') {
      setSearchResult(dayOff);
    } else {
      let result = findDayOff(searchInput);
      //console.log(`result`, result);
      setSearchResult(result);
    }
  }, [searchInput]);
  //lấy thông tin học sinh
  const m_getStudent = async () => {
    //console.log(`object`, props.route.params._id);
    let studentInfor = await getStudent(props.route.params._id);
    //console.log(`studentInfor`, studentInfor);
    setStudent(studentInfor);
    setSearchResult(studentInfor.dayOff);
    setDayOff(studentInfor.dayOff);
  };
  //console.log(`dayOff`, dayOff);
  //hàm tìm kiếm ngày nghỉ
  const findDayOff = strSearch => {
    let result = [];
    dayOff.forEach(element => {
      if (element.date.includes(strSearch)) {
        result.push(element);
      } else {
        let countFind = 1;
        if ('có phép'.includes(strSearch) || 'Có phép'.includes(strSearch)) {
          countFind = STATE_STUDENT.NGHI_PHEP;
        } else if (
          'không phép'.includes(strSearch) ||
          'Không phép'.includes(strSearch)
        ) {
          countFind = STATE_STUDENT.NGHI_KHONG_PHEP;
        }
        if (element.count == countFind) {
          result.push(element);
        }
      }
    });
    return result;
  };
  // cuộn Danh sách những ngày nghỉ lên top
  const scrollTop = () => {
    //console.log('scrollView', scrollView.current);
    scrollView.current.scrollTo({x: 0, y: 450, animated: true});
  };

  return (
    <SafeAreaView>
      <ScrollView ref={scrollView}>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 16,
          }}>
          <View
            style={{
              marginHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{marginVertical: 20}}>
              <Image
                source={require('../assets/student.png')}
                style={{width: 100, height: 100, borderRadius: 100}}
              />
            </View>
            <View style={{marginLeft: 20}}>
              <View style={styles.tagInfor}>
                <View style={styles.content}>
                  <Text>Họ tên:</Text>
                </View>
                <Text style={styles.textInfor}>{student.name}</Text>
              </View>
              <View style={styles.tagInfor}>
                <View style={styles.content}>
                  <Text>Lớp:</Text>
                </View>
                <Text style={styles.textInfor}>{student.class.name}</Text>
              </View>
              <View style={styles.tagInfor}>
                <View style={styles.content}>
                  <Text>SĐT:</Text>
                </View>
                <Text style={styles.textInfor}>{student.phoneNumber}</Text>
              </View>
              <View style={styles.tagInfor}>
                <View style={styles.content}>
                  <Text>GVCN:</Text>
                </View>
                <Text style={styles.textInfor}>
                  {student.class.teacher.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 16,
          }}>
          <Text style={{alignSelf: 'center', marginVertical: 5, fontSize: 20}}>
            Biểu đồ chuyên cần
          </Text>
          <ScrollView horizontal={true} ref={scrollHori}>
            <ContributionGraph
              values={[date_nghi_co_phep, date_nghi_khong_phep, ...dayOff]}
              endDate={date}
              numDays={365}
              width={1180}
              height={210}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: state => {
                  // console.log(`state`, state);
                  switch (state) {
                    case 0.8:
                      return 'rgb(0, 0, 0)';
                    case 0.2:
                      return 'rgb(102, 204, 255)';
                    case 1:
                      return 'rgb(255, 0, 0)';
                    default:
                      return 'rgb(230, 243, 255)';
                  }
                }, //chỉnh màu ô tại đây
              }}
            />
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
              marginTop: 5,
              justifyContent: 'flex-end',
              marginHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 20,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgb(102, 204, 255)',
                  width: 18,
                  height: 18,
                  marginRight: 7,
                }}
              />
              <Text style={{fontSize: 10}}>Có phép</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'rgb(255, 0, 0)',
                  width: 18,
                  height: 18,
                  marginRight: 7,
                }}
              />
              <Text style={{fontSize: 10}}>Không phép</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 16,
          }}>
          <Text style={{alignSelf: 'center', marginVertical: 5, fontSize: 20}}>
            Danh sách những ngày nghỉ
          </Text>
          <View style={{marginBottom: 10}}>
            <TextInput
              onFocus={scrollTop}
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: 'black',
                marginHorizontal: 20,
                color: '#000',
              }}
              placeholder={'Nhập ngày hoặc trạng thái'}
              onChangeText={text => {
                setSearchInput(text);
              }}
            />
          </View>
          <ScrollView
            style={{
              width: '90%',
              alignSelf: 'center',
              height: SCREEN_HEIGHT - 200,
              marginBottom: 20,
            }}>
            {searchResult.map((value, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  height: 30,
                  width: '100%',
                  borderTopWidth: index === 0 ? 0 : 0.5,
                  borderColor: '#d9d9d9',
                  alignItems: 'center',
                }}>
                <Text>{value.date}</Text>
                <Text>
                  {value.count == STATE_STUDENT.NGHI_PHEP
                    ? 'có phép'
                    : 'không phép'}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentInfor;
const styles = StyleSheet.create({
  textInfor: {fontSize: 18},
  tagInfor: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  content: {
    width: 50,
  },
});
