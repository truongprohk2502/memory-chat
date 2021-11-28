import { UserCard } from 'components/UserCard';

const ReceiveRequestList = () => {
  return (
    <div className="flex flex-col flex-auto gap-y-2 overflow-y-auto">
      <UserCard
        type="receive-request"
        name="Nguyen Dinh Truong"
        email="nguyendinhtruong@gmail.com"
        phone="01236712213"
        avatar=""
      />
    </div>
  );
};

export default ReceiveRequestList;
