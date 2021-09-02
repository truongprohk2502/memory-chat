import { faPen, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { Accordion } from 'components/Accordion';
import { Button } from 'components/Button';
import SubFrameLayout from 'layouts/SubFrameLayout';

interface IProps {
  hidden: boolean;
}

const Setting = ({ hidden }: IProps) => {
  return (
    <SubFrameLayout title="Setting" hidden={hidden}>
      <div className="relative w-fit mx-auto">
        <img
          src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
          alt="logo"
          className="w-24 h-24 object-cover mx-auto rounded-full mt-8 cursor-pointer"
        />
        <Button
          variant="circle"
          size="sm"
          icon={faPen}
          onClick={() => {}}
          buttonClassName="absolute bottom-0 right-0"
        />
      </div>
      <div className="font-bold my-6 text-center">Nguyen Dinh Truong</div>
      <Accordion title="Personal info">
        <div className="flex justify-end">
          <Button icon={faPenFancy} text="Edit" size="sm" onClick={() => {}} />
        </div>
        <div className="mb-2">
          <div className="text-gray-500">Name</div>
          <div className="text-sm font-semibold">Nguyen Dinh Truong</div>
        </div>
        <div className="my-2">
          <div className="text-gray-500">Email</div>
          <div className="text-sm font-semibold">
            nguyendinhtruong98@gmail.com
          </div>
        </div>
        <div className="my-2">
          <div className="text-gray-500">Phone</div>
          <div className="text-sm font-semibold">0789250298</div>
        </div>
        <div className="my-2">
          <div className="text-gray-500">Address</div>
          <div className="text-sm font-semibold">898 Tran Cao Van</div>
        </div>
      </Accordion>
    </SubFrameLayout>
  );
};

export default Setting;
