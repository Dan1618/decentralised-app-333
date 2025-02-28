import { Box, Text, Select, Image } from 'grommet';

import { useMode } from 'app/common/state/shortcuts';

import logo from '../../images/logo.png';

export const Selector = ({ ...rest }) => {
  const { isLightMode, mode, setMode, toggleMode } = useMode();

  return (
    <Select
      plain
      size="medium"
      // selected={[2]}
      options={[
        'All networks',
        <Box direction="row" gap="small">
          <Image fit="cover" width="10" src={logo} /> Metamasks
        </Box>,
        'large',
      ]}
      value={<Text>All networks</Text>}

      // onChange={({ option }) => setValue(option)}
    >
      {(option, state) => {
        return (
          <Box pad="small" background={isLightMode ? 'white' : 'black'}>
            {option}
          </Box>
        );
      }}
    </Select>
  );
};
