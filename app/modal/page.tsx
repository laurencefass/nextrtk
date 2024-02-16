import { Modal } from "@components/Modal/modal";
import { ImageCarousel, ImageData } from '@components/carousel/ImageCarousel';

export default async function Page() {
    const response = await fetch('https://picsum.photos/v2/list?limit=6');
    const data = await response.json();
    const images = data.map((item: ImageData) => item.download_url);
  
    return <>
    <Modal>
        <div>Modal content is passed in as props.children</div>
        <div>Close button will rewind to previous route url</div>
        <div>Back button will close the modal and forward will reopen</div>
        <br/>
        <ImageCarousel/>
    </Modal>
    </>
}