import { useEffect } from 'react';
import { Box, Text, BoxProps } from 'grommet';
import { useRecoilState } from 'recoil';
import { notification, ENotificationId } from 'app/common/state/atoms';

export const Notification = ({ ...rest }) => {
  const [notificationAtom, setNotificationAtom] = useRecoilState(notification);

  if (!notificationAtom.message) return null;
  const colors = { success: 'success', error: 'error', info: 'info' };
  const bgColors = {
    success: 'successSoft',
    error: 'errorSoft',
    info: 'infoSoft',
  };
  const backgroundColor = bgColors[notificationAtom.type];
  const color = colors[notificationAtom.type];
  return (
    <Box
      background={backgroundColor}
      fill="horizontal"
      height="xxsmall"
      justify="center"
      align="center"
      pad="small"
      {...rest}
    >
      <Text textAlign="center" color={color}>
        {notificationAtom.message}
      </Text>
    </Box>
  );
};
