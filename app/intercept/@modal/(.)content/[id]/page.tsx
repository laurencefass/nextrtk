import { Content } from '../../../Content'
import { Modal } from '@components/Modal/modal'

export default function Page() {
    return <Modal key={Math.random()} navigate={false}>
        <Content />
    </Modal>
}