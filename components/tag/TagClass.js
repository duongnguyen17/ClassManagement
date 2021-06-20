import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import SwipeCustom from './SwipeCustom';

const TagClass = props => {
  const {classData, onPressItem, editClass, deleteClass} = props;

  return (
    <SwipeCustom
      edit={() => {
        editClass(classData);
      }}
      delete={() => {
        deleteClass(classData);
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tag]}
        onPress={() => {
          onPressItem(classData._id, classData.name);
        }}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            flexDirection: 'column',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
                marginVertical: 5,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontWeight: '600'}}>Lớp: </Text>
              </View>
              <Text style={{fontWeight: '600', fontSize: 18}}>
                {classData.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <View>
                <Text style={{fontWeight: '600'}}>Sĩ số: </Text>
              </View>
              <Text style={{fontWeight: '600', fontSize: 18}}>
                {classData.students.length}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '60%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontWeight: '600'}}>Khoá: </Text>
              </View>
              <View>
                <Text style={{fontWeight: '600', fontSize: 18}}>
                  {classData.year}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontWeight: '600'}}>GVCN: </Text>
              </View>
              <View>
                {classData.teacher !== null ? (
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    {classData.teacher.name}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SwipeCustom>
  );
};
export default TagClass;
const styles = StyleSheet.create({
  tag: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 2,
    shadowColor: '#595959',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
});
