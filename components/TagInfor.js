//ren ra thẻ dạng: Họ và tên: Nguyễn Văn X
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
const TagInfor = props => {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [isEdit, setIsEdit] = useState(props.isEdit);
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
            defaultValue={content}
            style={{borderBottomWidth: 1, borderColor: 'gray', width: 200}}
          />
        ) : (
          <Text style={{fontWeight: '600', fontSize: 18}}>{content}</Text>
        )}
      </View>
    </View>
  );
};

export default TagInfor;
