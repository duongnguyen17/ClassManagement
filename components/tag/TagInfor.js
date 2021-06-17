//ren ra thẻ dạng: Họ và tên: Nguyễn Văn X
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
const TagInfor = props => {
  const {content, title, isEdit} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{fontWeight: '600'}}>{title}: </Text>
      </View>
      <View>
        {isEdit ? (
          <TextInput
            style={{fontWeight: '600', fontSize: 18}}
            //defaultValue={content}
            value={content}
            style={{borderBottomWidth: 1, borderColor: 'gray', width: 200}}
            onChangeText={text => {}}
          />
        ) : (
          <Text style={{fontWeight: '600', fontSize: 18}}>{content}</Text>
        )}
      </View>
    </View>
  );
};

export default TagInfor;
