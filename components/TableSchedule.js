import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {changeDaySchedule} from '../realm';
import {SESSION} from '../constants';
const TableSchedule = ({day}) => {
  // console.log(`day`, day);
  const [subMorning, setSubMorning] = useState([...day.subMorning]);
  const [subAfternoon, setSubAfternoon] = useState([...day.subAfternoon]);
  const [isEdit, setIsEdit] = useState(false);
  // useEffect(() => {
  //   makeACopy();
  // }, []);
  //make a copy
  // const makeACopy = () => {
  //   let subTemp = [...day.subMorning];

  //   // Object.assign(subTemp, day.subMorning);
  //   setSubMorning(subTemp);
  //   subTemp = [];
  //   Object.assign(subTemp, day.subAfternoon);
  //   setSubAfternoon(subTemp);
  // };

  const renLession = num => {
    let arr = [];
    for (let i = 0; i < num; ++i) {
      arr.push(i + 1);
    }
    const result = arr.map((value, index) => (
      <View
        key={index}
        style={[styles.tile, {alignItems: 'center', justifyContent: 'center'}]}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{value}</Text>
      </View>
    ));
    return result;
  };
  //save
  const save = async () => {
    let newDaySchedule = {
      _id: day._id,
      name: day.name,
      subMorning: subMorning,
      subAfternoon: subAfternoon,
    };
    await changeDaySchedule(newDaySchedule);
  };

  const addSub = session => {
    let newSub = {_id: Date.now(), name: ''};
    if (session == SESSION.MORNING) {
      // let subMorningTemp = subMorning;
      //console.log(`newSub`, newSub);
      //subMorningTemp.push(newSub);
      setSubMorning(x => [...(x || []), newSub]);
    } else {
      // let subAfternoonTemp = subAfternoon;
      // subAfternoonTemp.push(newSub);
      setSubAfternoon(x => [...(x || []), newSub]);
    }
  };
  //delete sub
  const deleteSub = (session, index) => {
    if (session == SESSION.MORNING) {
      let subTemp = subMorning;
      subTemp.splice(index, 1);
      setSubMorning(subTemp);
    } else {
      let subTemp = subAfternoon;
      subTemp.splice(index, 1);
      setSubAfternoon(subTemp);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: 20,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#0000ff',
          }}>
          {day.name}
        </Text>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            if (isEdit) {
              save();
            }
            setIsEdit(!isEdit);
          }}>
          <MaterialIcons
            name={isEdit ? 'check-circle-outline' : 'edit'}
            size={25}
            color={'#3399ff'}
            style={{marginHorizontal: 10, marginVertical: 5}}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 10, marginHorizontal: 5, borderWidth: 0.5}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.sessionColumn} />
          <View style={styles.lessionColumn}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Tiết</Text>
          </View>
          <View style={styles.subjectColumn}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Môn</Text>
          </View>
        </View>
        <View style={styles.session}>
          <View style={styles.sessionColumn}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Sáng</Text>
          </View>
          <View style={styles.lessionColumn}>
            {renLession(subMorning.length)}
            {isEdit ? (
              <View
                style={[
                  styles.tile,
                  {alignItems: 'center', justifyContent: 'center', height: 20},
                ]}></View>
            ) : null}
          </View>
          <View style={styles.subjectColumn}>
            {subMorning.map((value, index) => (
              <View
                key={index}
                style={[
                  styles.tile,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  {/* <TouchableOpacity
                    style={{position: 'absolute', top: 5, right: 5}}>
                    <Octicons name="three-bars" size={15} color="gray" />
                  </TouchableOpacity> */}
                  {isEdit ? (
                    <>
                      <TextInput
                        placeholder="Nhập tên môn học"
                        defaultValue={value.name}
                        onChangeText={text => {
                          subMorning[index].name = text;
                        }}
                      />
                      {/* <TextInput
                        placeholder="Nhập tên giáo viên"
                        defaultValue={value.teacher}
                        onChangeText={text => {
                          subMorning[index].teacher = text;
                        }}
                      /> */}
                    </>
                  ) : (
                    <>
                      <Text style={styles.subjectText}>{value.name}</Text>
                      {/* <Text style={styles.noteText}>g/v: {value.teacher}</Text> */}
                    </>
                  )}

                  {/* <ScrollView style={{height: 30}}> */}
                  {/* <Text style={styles.noteText}>note: {value.note}</Text> */}
                  {/* </ScrollView> */}
                </View>
                {isEdit ? (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 5,
                      width: 30,
                      height: '80%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      deleteSub(SESSION.MORNING, index);
                    }}>
                    <Octicons name={'trashcan'} size={20} color={'gray'} />
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
            {isEdit ? (
              <View
                style={[
                  styles.tile,
                  {alignItems: 'center', justifyContent: 'center', height: 40},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    addSub(SESSION.MORNING);
                  }}>
                  <MaterialIcons
                    name={'add-circle-outline'}
                    size={35}
                    color={'#3399ff'}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.session}>
          <View style={styles.sessionColumn}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Chiều</Text>
          </View>
          <View style={styles.lessionColumn}>
            {renLession(subAfternoon.length)}
            {isEdit ? (
              <View
                style={[
                  styles.tile,
                  {alignItems: 'center', justifyContent: 'center', height: 20},
                ]}></View>
            ) : null}
          </View>
          <View style={styles.subjectColumn}>
            {subAfternoon.map((value, index) => (
              <View
                key={index}
                style={[
                  styles.tile,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}>
                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  {/* <TouchableOpacity
                    style={{position: 'absolute', top: 5, right: 5}}>
                    <Octicons name="three-bars" size={15} color="gray" />
                  </TouchableOpacity> */}
                  {isEdit ? (
                    <>
                      <TextInput
                        placeholder="Nhập tên môn học"
                        defaultValue={value.name}
                      />
                      {/* <TextInput
                        placeholder="Nhập tên giáo viên"
                        defaultValue={value.teacher}
                      /> */}
                    </>
                  ) : (
                    <>
                      <Text style={styles.subjectText}>{value.name}</Text>
                      {/* <Text style={styles.noteText}>g/v: {value.teacher}</Text> */}
                    </>
                  )}
                  {/* <ScrollView style={{height: 50}}> */}
                  {/* <Text style={styles.noteText}>note: {value.note}</Text> */}
                  {/* </ScrollView> */}
                </View>
                {isEdit ? (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 5,
                      width: 30,
                      height: '80%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      deleteSub(SESSION.AFTERNOON, index);
                    }}>
                    <Octicons name={'trashcan'} size={20} color={'gray'} />
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
            {isEdit ? (
              <View
                style={[
                  styles.tile,
                  {alignItems: 'center', justifyContent: 'center', height: 40},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    addSub(SESSION.AFTERNOON);
                  }}>
                  <MaterialIcons
                    name={'add-circle-outline'}
                    size={35}
                    color={'#3399ff'}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TableSchedule;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 3,
    shadowColor: '#595959',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    marginVertical: 5,
  },
  session: {flexDirection: 'row'},
  sessionColumn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  lessionColumn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  subjectColumn: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  tile: {
    width: '100%',
    flex: 1,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'gray',
    alignItems: 'center',
  },
  subjectText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteText: {
    fontSize: 15,
    fontWeight: '300',
  },
});
