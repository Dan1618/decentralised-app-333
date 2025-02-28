import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { useCurrentPath } from 'app/common/hooks';
import {
  ResponsiveContext,
  Box,
  Card,
  Grid,
  Button,
  Text,
  Avatar,
} from 'grommet';

import { useNotification, ENotificationId } from 'app/common/state';
import { isSmall } from 'app/modernUI/theme';
import {
  walletAccount,
  farmDepositCoinType,
  TFarmDepositCoinType,
} from 'app/common/state/atoms';
import { toExactFixed } from 'app/common/functions/utils';
import { ChainBadge, Notification } from 'app/modernUI/components';
import { EChain } from 'app/common/functions/Web3Client';

const Disabled = () => {
  return (
    <Box
      background="rgba(0,0,0,.7)"
      justify="center"
      align="center"
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <Text size="xlarge">Coming soon...</Text>
    </Box>
  );
};

interface IAssetCard {
  id: number;
  type?: TFarmDepositCoinType;
  name: string;
  totalAssetSupply: string | number;
  interest: string | number;
  isLoading: any;
  sign: string;
  icons: Array<{ src: string }>;
  disabled: boolean;
  chain: EChain;
  isBooster: boolean;
}

export const AssetCard = ({
  id,
  type,
  name,
  totalAssetSupply,
  interest,
  isLoading,
  sign,
  icons,
  disabled,
  chain,
  isBooster = false,
  ...rest
}: IAssetCard) => {
  const { navigate } = useCurrentPath();
  const { notification, setNotification, resetNotification } =
    useNotification();

  const [walletAccountAtom, setWalletAccountAtom] =
    useRecoilState(walletAccount);

  const tvl = isLoading
    ? 'Loading...'
    : sign + (+toExactFixed(totalAssetSupply, 2))?.toLocaleString();

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          {isSmall(size) ? (
            <Card
              onClick={() => {
                if (!disabled && !!walletAccountAtom) navigate('/farm/' + id);
                else
                  setNotification({
                    id: ENotificationId.ASSET_CARD,
                    type: 'error',
                    message: 'Connect your wallet',
                  });
              }}
              style={{ position: 'relative' }}
              pad={{ horizontal: 'medium', vertical: 'medium' }}
              margin={{ top: 'small' }}
              height="fit"
              background="card"
              align="center"
              justify="center"
              fill="horizontal"
            >
              {disabled && <Disabled />}
              <Box fill direction="row" justify="between">
                <Box>
                  <Box direction="row" gap="small">
                    {icons.map((icon, i) => (
                      <Avatar
                        key={i}
                        align="center"
                        src={icon.src}
                        size="small"
                        justify="center"
                        overflow="hidden"
                        round="full"
                      />
                    ))}
                  </Box>
                  <Box pad="none" margin={{ top: 'medium' }}>
                    <Text>Asset</Text>
                    <Text size="xlarge" weight="bold">
                      {name}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box align="end">
                    <ChainBadge chain={chain} />
                  </Box>
                  <Box pad="none" margin={{ top: 'medium' }} align="end">
                    <Text>APY</Text>
                    <Text size="xlarge" weight="bold">
                      {interest}%
                    </Text>
                  </Box>
                  <Box pad="none" margin={{ top: 'medium' }} align="end">
                    <Text margin="none">TVL</Text>
                    <Text margin={{ top: '-5px' }}>{tvl}</Text>
                  </Box>
                </Box>
              </Box>
              <Box fill="horizontal" margin={{ top: 'medium' }} />
              <Notification id={ENotificationId.ASSET_CARD} />
            </Card>
          ) : (
            <Card
              pad={{ horizontal: 'medium', vertical: 'none' }}
              margin={{ top: 'small' }}
              height="fit"
              background="card"
              align="center"
              justify="center"
              fill="horizontal"
            >
              <Grid
                fill="horizontal"
                rows="xxsmall"
                align="center"
                columns={{ size: 'xsmall', count: 'fit' }}
                pad={{ top: '10px', bottom: '10px' }}
              >
                <Text weight="bold">
                  {name}
                  {isBooster && <Text color="#1C1CFF"> BOOST</Text>}
                </Text>
                <Box direction="row" gap="small">
                  {icons.map((icon, i) => (
                    <Avatar
                      key={i}
                      align="center"
                      src={icon.src}
                      size="small"
                      justify="center"
                      overflow="hidden"
                      round="full"
                    />
                  ))}
                </Box>
                <ChainBadge chain={chain} />
                <Text>{tvl}</Text>
                <Box direction="row" justify="between" align="center">
                  <Text margin={{ right: 'small' }}>{interest}%</Text>
                  <Link to={'/farm/' + id}>
                    <Button
                      disabled={!walletAccountAtom}
                      label={walletAccountAtom ? 'Farm' : 'Connect wallet'}
                    />
                  </Link>
                </Box>
              </Grid>
            </Card>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};
