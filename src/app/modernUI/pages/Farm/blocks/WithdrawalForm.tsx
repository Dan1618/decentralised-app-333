import { useWithdrawalForm } from 'app/common/state/farm';
import { NewInput, Notification, Spinner } from 'app/modernUI/components';
import SlideButton from 'app/modernUI/components/SlideButton';
import { Box, Button, Text } from 'grommet';
import { Infos } from './Infos';
import { TopHeader } from './TopHeader';

export const WithdrawalForm = ({
  selectedFarm,
  isLoading,
  updateFarmInfo,
  selectStableCoin,
  selectedStableCoin,
  ...rest
}) => {
  const {
    error,
    withdrawValue,
    handleWithdrawalFieldChange,
    setToMax,
    isWithdrawalRequestsLoading,
    isWithdrawing,
    handleWithdraw,
    biconomyStatus,
    setBiconomyStatus,
  } = useWithdrawalForm({ selectedFarm, selectedStableCoin, updateFarmInfo });

  return (
    <Box fill>
      {!selectedStableCoin || isWithdrawing || isWithdrawalRequestsLoading ? (
        <Box
          align="center"
          justify="center"
          margin={{ top: 'large', bottom: 'medium' }}
        >
          <Spinner pad="large" />
        </Box>
      ) : (
        <>
          <Box margin={{ top: 'large' }}>
            <TopHeader selectedFarm={selectedFarm} />
            <Box margin={{ top: 'medium' }}>
              <NewInput
                coinIcon={selectedFarm.sign}
                inputProps={{
                  value: withdrawValue || '',
                  onChange: handleWithdrawalFieldChange,
                  max: selectedFarm.depositedAmount || 0,
                }}
                maxButtonProps={{
                  onClick: setToMax,
                }}
                selectProps={{
                  options: selectedFarm.stableCoins || [],
                }}
                selectedTokenInfo={selectedStableCoin}
                setSelectedToken={selectStableCoin}
              />
              <Text color="error" size="small" margin={{ top: 'small' }}>
                {error}
              </Text>
            </Box>
          </Box>

          <Box margin={{ top: 'medium' }}>
            <Infos
              selectedFarm={selectedFarm}
              inputValue={-1 * +withdrawValue}
              biconomyStatus={biconomyStatus}
              setBiconomyStatus={setBiconomyStatus}
            />
          </Box>
        </>
      )}
      <Box margin={{ top: 'large' }}>
        <Button
          primary
          disabled={
            isWithdrawing ||
            isWithdrawalRequestsLoading ||
            !+withdrawValue ||
            error !== ''
          }
          label={+withdrawValue > 0 ? 'Withdraw' : 'Enter amount'}
          onClick={handleWithdraw}
        />
      </Box>
    </Box>
  );
};
