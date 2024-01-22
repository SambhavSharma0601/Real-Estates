import { useState } from 'react';
import { FaShare } from 'react-icons/fa';
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    PinterestShareButton,
} from 'react-share';

const ShareButtons = () => {
    const [showShareButtons, setShowShareButtons] = useState(false);
    const shareUrl = window.location.href;
    const title = document.title;

    return (
        <div className='fixed top-[65%] right-[3%]  bg-black p-4 rounded-2xl'>
            <div className='relative '>
                <FaShare
                    className='text-slate-500 cursor-pointer'
                    onClick={() => setShowShareButtons(!showShareButtons)}
                />
                {showShareButtons && (
                    <div className='flex p-3 gap-4 top-full bg-slate-400 mt-3 right-0 '>

                        <FacebookShareButton url={shareUrl} quote={title}>
                            <img src='https://cdn-icons-png.flaticon.com/256/124/124010.png' width={30}></img>
                        </FacebookShareButton>

                        <TwitterShareButton url={shareUrl} title={title}>
                            <img src='https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1705104000&semt=ais' width={30}></img>
                        </TwitterShareButton>


                        <EmailShareButton url={shareUrl} subject={title}>
                            <img src='https://ongpng.com/wp-content/uploads/2023/09/gmail-logo-2.png' width={30}></img>
                        </EmailShareButton>
                        <WhatsappShareButton url={shareUrl} title={title}>
                            <img src='https://static.vecteezy.com/system/resources/previews/019/490/741/non_2x/whatsapp-logo-whatsapp-icon-logo-free-free-vector.jpg' width={30}></img>
                        </WhatsappShareButton>
                        <PinterestShareButton url={shareUrl}>
                            <img src='https://i.pinimg.com/736x/98/a6/de/98a6de54dc27442a3c8375ab303c6e42.jpg' width={30}></img>
                        </PinterestShareButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShareButtons;
