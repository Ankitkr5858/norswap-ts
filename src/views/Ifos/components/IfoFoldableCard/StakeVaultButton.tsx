import { Button } from '@nswap/uikit'

import { useTranslation } from 'contexts/Localization'

const StakeVaultButton = (props) => {
  const { t } = useTranslation()

  return (
    <Button {...props} disabled>
      {t('Stake NSWAP in IFO pool')}
    </Button>
  )
}

export default StakeVaultButton
