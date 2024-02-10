import { Checkbox, Input } from '@resolid/mix-ui';

export const FormExample = () => {
  return (
    <>
      <div className={'flex flex-row items-center justify-start gap-4'}>
        <div className={'flex flex-col'}>
          <label htmlFor={'feFirstName'} className={''}>
            名 <span className={'text-red-500'}>*</span>
          </label>
          <Input className={'w-full'} id={'feFirstName'} />
        </div>
        <div className={'flex flex-col'}>
          <label htmlFor={'feLastName'} className={''}>
            姓 <span className={'text-red-500'}>*</span>
          </label>
          <Input className={'w-full'} id={'feLastName'} />
        </div>
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'feEmail'} className={''}>
          电子邮箱 <span className={'text-red-500'}>*</span>
        </label>
        <Input className={'w-full'} id={'feEmail'} />
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'fePassword'} className={''}>
          密码 <span className={'text-red-500'}>*</span>
        </label>
        <Input className={'w-full'} id={'fePassword'} />
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'fePasswordRepeat'} className={''}>
          确认密码 <span className={'text-red-500'}>*</span>
        </label>
        <Input className={'w-full'} id={'fePasswordRepeat'} />
      </div>
      <div>
        <Checkbox defaultChecked={true}>同意用户协议和隐私政策</Checkbox>
      </div>
    </>
  );
};
