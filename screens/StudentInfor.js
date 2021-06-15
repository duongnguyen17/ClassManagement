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
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const StudentInfor = props => {
  const scrollView = useRef(null);
  const [student, setStudent] = useState({
    _id: 872348617234,
    name: 'Nguyễn Văn Khánh',
    phoneNumber: '0393072748',
    avatar: '../assets/student.png',
    class: {
      _id: 89123482343,
      name: '12A1',
      year: '14-17',
      teacher: {
        name: 'Nguyễn Văn Dương',
      },
    },
    dayOff: [
      {
        date: '2021-06-14',
        count: 4,
      },
      {
        date: '2021-06-02',
        count: 2,
      },
      {
        date: '2021-06-10',
        count: 2,
      },
      {
        date: '2021-05-14',
        count: 4,
      },
      {
        date: '2021-06-12',
        count: 2,
      },
      {
        date: '2021-05-10',
        count: 2,
      },
      {
        date: '2021-06-13',
        count: 4,
      },
      {
        date: '2020-06-02',
        count: 2,
      },
      {
        date: '2020-06-10',
        count: 2,
      },
    ],
  });
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const date = new Date();

  useEffect(() => {
    if (searchInput == '') {
      setSearchResult(student.dayOff);
    } else {
      let result = findDayOff(searchInput);
      //console.log(`result`, result);
      setSearchResult(result);
    }
  }, [searchInput]);

  //hàm tìm kiếm ngày nghỉ
  const findDayOff = strSearch => {
    let result = [];
    student.dayOff.forEach(element => {
      if (element.date.includes(strSearch)) {
        result.push(element);
      } else if (element.count == strSearch) {
        result.push(element);
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
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{marginVertical: 20}}>
              <Image
                source={require('../assets/student.png')}
                style={{width: 100, height: 100, borderRadius: 100}}
              />
            </View>
            <View>
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
          <ScrollView horizontal={true}>
            <ContributionGraph
              values={student.dayOff}
              endDate={() => date.setDate(date.getDate() + 50)}
              numDays={365}
              width={SCREEN_WIDTH - 20}
              height={210}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: state => {
                  //console.log(`state`, state);
                  switch (state) {
                    case 0.8:
                      return 'rgb(0, 0, 0)';
                    case 0.2:
                      return 'rgb(102, 204, 255)';
                    case 1:
                      return 'rgb(255, 0, 0)';
                    default:
                      return 'rgb(204, 230, 255)';
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
              minHeight: 100,
              maxHeight: SCREEN_HEIGHT,
            }}>
            {searchResult.map((value, index) => (
              <View
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
                <Text>{value.count}</Text>
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
