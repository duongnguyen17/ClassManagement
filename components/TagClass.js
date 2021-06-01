//in ra thẻ thông tin lớp học
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import TagInfor from '../components/TagInfor';
const TagClass = props => {
  const {inforClass, isEdit, showModal} = props

  return (
    <TouchableOpacity
      style={[
        styles.tag,
        {flexDirection: 'row', marginVertical: 5, alignItems: 'center'},
      ]}
      disabled={isEdit}
      onLongPress={() => {
        showModal(inforClass);
      }}>
      <TouchableOpacity
        disabled={isEdit}
        style={{
          width: 60,
          height: 80,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#4d94ff',
          marginHorizontal: 10,
          marginVertical: 20,
        }}>
        <Image
          style={{
            width: 60,
            height: 80,
            borderRadius: 5,
          }}
         // source={{uri: avatar}}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          marginHorizontal: 25,
          marginVertical: 10,
          flexDirection: 'column',
        }}>
        <TagInfor title={'Lớp'} content={inforClass.name} isEdit={isEdit} />
        <TagInfor title={'Khóa'} content={inforClass.year} isEdit={isEdit} />
        <TagInfor title={'GVCN'} content={inforClass.teacher} isEdit={isEdit} />
      </View>
    </TouchableOpacity>
  );
};
export default TagClass;
const styles = StyleSheet.create({
  tag: {
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
    elevation: 3,
    marginVertical: 2,
  },
});
