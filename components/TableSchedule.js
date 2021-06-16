import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SESSION} from '../constants';
const TableSchedule = ({day}) => {
  const [subMorning, setSubMorning] = useState(day.subMorning);
  const [subAfternoon, setsubAfternoon] = useState(day.subAfternoon);
  const [isEdit, setIsEdit] = useState(false);

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

  const addSub = session => {
    if (session == SESSION.MORNING) {
      let subMorningTemp = subMorning;
      let newSub = {_id: Date.now(), name: '', teacher: ''};
      console.log(`newSub`, newSub);
      subMorningTemp.push(newSub);
      setSubMorning(subMorningTemp);
    } else {
      let subAfternoonTemp = subAfternoon;
      let newSub = {
        _id: Date.now(),
        name: '',
        teacher: '',
      };
      subAfternoonTemp.push(newSub);
      setSubMorning(subAfternoonTemp);
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
                  <Text style={styles.subjectText}>{value.name}</Text>
                  <Text style={styles.noteText}>g/v: {value.teacher}</Text>
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
                  <Text style={styles.subjectText}>{value.name}</Text>
                  <Text style={styles.noteText}>g/v: {value.teacher}</Text>
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
