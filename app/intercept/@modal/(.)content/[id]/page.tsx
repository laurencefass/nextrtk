import { Content } from '../../../Content'
import { Modal } from '@components/Modal/modal'

export default function Page() {
    return <Modal navigate={true}>
        <p>Closing this modal or clicking outside will restore the parent URL in the address bar</p>
        <p>Opening this url in a different tab or window will display the same content in main</p>
        <Content />
    </Modal>
}