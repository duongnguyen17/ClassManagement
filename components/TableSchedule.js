import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';

const TableSchedule = props => {
  const {title, lessMorning, subMorning, lessAfternoon, subAfternoon} = props;
  const renLession = num => {
    let arr = [];
    for (let i = 0; i < num; ++i) {
      arr.push(i + 1);
    }
    const result = arr.map((value, index) => (
      <View key={index} style={[styles.tile, {alignItems: 'center'}]}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{value}</Text>
      </View>
    ));
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={{marginLeft: 20, marginTop: 10}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#0000ff',
          }}>
          {title}
        </Text>
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
          <View style={styles.lessionColumn}>{renLession(lessMorning)}</View>
          <View style={styles.subjectColumn}>
            {subMorning.map((value, index) => (
              <View key={index} style={styles.tile}>
                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  <TouchableOpacity
                    style={{position: 'absolute', top: 5, right: 5}}>
                    <Octicons name="three-bars" size={15} color="gray" />
                  </TouchableOpacity>
                  <Text style={styles.subjectText}>{value.name}</Text>
                  <Text style={styles.noteText}>g/v: {value.teacher}</Text>
                  {/* <ScrollView style={{height: 30}}> */}
                  <Text style={styles.noteText}>note: {value.note}</Text>
                  {/* </ScrollView> */}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.session}>
          <View style={styles.sessionColumn}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Chiều</Text>
          </View>
          <View style={styles.lessionColumn}>{renLession(lessAfternoon)}</View>
          <View style={styles.subjectColumn}>
            {subAfternoon.map((value, index) => (
              <View key={index} style={styles.tile}>
                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  <TouchableOpacity
                    style={{position: 'absolute', top: 5, right: 5}}>
                    <Octicons name="three-bars" size={15} color="gray" />
                  </TouchableOpacity>
                  <Text style={styles.subjectText}>{value.name}</Text>
                  <Text style={styles.noteText}>g/v: {value.teacher}</Text>
                  {/* <ScrollView style={{height: 50}}> */}
                  <Text style={styles.noteText}>note: {value.note}</Text>
                  {/* </ScrollView> */}
                </View>
              </View>
            ))}
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
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'column',
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
