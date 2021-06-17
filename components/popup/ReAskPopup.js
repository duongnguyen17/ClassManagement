import React from 'react';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
const ReAskPopup = props => {
  const {visible, onPressOK, onPressCancel} = props;
  return (
    <Dialog
      visible={visible}
      dialogTitle={<DialogTitle title="Bạn có chắc chắn muốn xoá?" />}
      footer={
        <DialogFooter>
          <DialogButton text="CANCEL" onPress={onPressCancel} />
          <DialogButton text="OK" onPress={onPressOK} />
        </DialogFooter>
      }></Dialog>
  );
};

export default ReAskPopup;
