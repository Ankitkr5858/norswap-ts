// @ts-nocheck
// @ts-nocheck
import { Token } from '@danielvindax/norswap-sdk'
import { Modal, InjectedModalProps } from '@nswap/uikit'
import ImportToken from 'components/SearchModal/ImportToken'
import { useTranslation } from 'contexts/Localization'

interface Props extends InjectedModalProps {
  tokens: Token[]
  onCancel: () => void
}

const ImportTokenWarningModal: React.FC<Props> = ({ tokens, onDismiss, onCancel }) => {
  const { t } = useTranslation()
  return (
    <Modal
      title={t('Import Token')}
      onDismiss={() => {
        onDismiss?.()
        onCancel()
      }}
      style={{ maxWidth: '420px' }}
    >
      <ImportToken tokens={tokens} handleCurrencySelect={onDismiss} />
    </Modal>
  )
}

export default ImportTokenWarningModal
