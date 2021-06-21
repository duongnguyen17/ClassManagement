import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {changeDaySchedule} from '../../realm';
import {SESSION, SUBJECT, SUBJECTNAME} from '../../constants';
import RNPickerSelect from 'react-native-picker-select';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const TableScheduleTemp = ({day}) => {
  const [subMorning, setSubMorning] = useState([...day.subMorning]);
  const [subAfternoon, setSubAfternoon] = useState([...day.subAfternoon]);
  const [isEdit, setIsEdit] = useState(false);
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
    let newSub = '';
    if (session == SESSION.MORNING) {
      setSubMorning(x => [...(x || []), newSub]);
    } else {
      setSubAfternoon(x => [...(x || []), newSub]);
    }
  };
  //delete sub
  const deleteSub = (session, index) => {
    if (session == SESSION.MORNING) {
      // let temp = subMorning;
      // temp.splice(index, 1);
      setSubMorning(x => {
        x.splice(index, 1);
        return x;
      });
    } else {
      setSubAfternoon(x => {
        x.splice(index, 1);
        return x;
      });
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
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 5,
          borderWidth: 0.5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.sessionColumn} />
          <View style={styles.lessionColumn}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Tiết</Text>
          </View>
          <View style={styles.subjectColumn}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Môn</Text>
          </View>
        </View>
        {subMorning.length === 0 && !isEdit ? null : (
          <View style={styles.session}>
            <View style={styles.sessionColumn}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Sáng</Text>
            </View>
            <View>
              {subMorning.map((value, index) => (
                <View style={styles.tag} key={index}>
                  <View style={styles.lessionColumn}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {index + 1}
                    </Text>
                  </View>
                  {isEdit ? (
                    <View
                      style={[styles.subjectColumn, {flexDirection: 'row'}]}>
                      <View style={{flex: 1}}>
                        <RNPickerSelect
                          items={SUBJECT}
                          placeholder={{
                            label: 'Chọn môn học...',
                            value: null,
                          }}
                          value={value}
                          onValueChange={value => {
                            subMorning[index] = value;
                          }}
                        />
                      </View>

                      <TouchableOpacity
                        style={{
                          width: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          deleteSub(SESSION.MORNING, index);
                        }}>
                        <Octicons name={'trashcan'} size={20} color={'gray'} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.subjectColumn}>
                      <Text style={styles.subjectText}>
                        {SUBJECTNAME[value]}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
              {isEdit ? (
                <View style={styles.tag}>
                  <View style={styles.lessionColumn} />
                  <View style={styles.subjectColumn}>
                    <TouchableOpacity
                      style={{marginVertical: 8}}
                      onPress={() => {
                        addSub(SESSION.MORNING);
                      }}>
                      <MaterialIcons
                        name={'add-circle-outline'}
                        size={25}
                        color={'#3399ff'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        )}
        {subAfternoon.length === 0 && !isEdit ? null : (
          <View style={styles.session}>
            <View style={styles.sessionColumn}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Chiều</Text>
            </View>
            <View>
              {subAfternoon.map((value, index) => (
                <View style={styles.tag} key={index}>
                  <View style={styles.lessionColumn}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {index + 1}
                    </Text>
                  </View>
                  {isEdit ? (
                    <View
                      style={[styles.subjectColumn, {flexDirection: 'row'}]}>
                      <View style={{flex: 1}}>
                        <RNPickerSelect
                          items={SUBJECT}
                          placeholder={{
                            label: 'Chọn môn học...',
                            value: null,
                          }}
                          value={value}
                          onValueChange={value => {
                            subAfternoon[index] = value;
                          }}
                        />
                      </View>

                      <TouchableOpacity
                        style={{
                          width: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          deleteSub(SESSION.AFTERNOON, index);
                        }}>
                        <Octicons name={'trashcan'} size={20} color={'gray'} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.subjectColumn}>
                      <Text style={styles.subjectText}>
                        {SUBJECTNAME[value]}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
              {isEdit ? (
                <View style={styles.tag}>
                  <View style={styles.lessionColumn} />
                  <View style={styles.subjectColumn}>
                    <TouchableOpacity
                      style={{marginVertical: 8}}
                      onPress={() => {
                        addSub(SESSION.AFTERNOON);
                      }}>
                      <MaterialIcons
                        name={'add-circle-outline'}
                        size={25}
                        color={'#3399ff'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default TableScheduleTemp;
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
  sessionColumn: {
    width: 60,
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
  session: {flexDirection: 'row', width: '100%'},
  subjectColumn: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  tag: {flexDirection: 'row', width: SCREEN_WIDTH - 80},
  subjectText: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
