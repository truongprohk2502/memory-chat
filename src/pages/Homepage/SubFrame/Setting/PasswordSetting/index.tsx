import { useEffect, useState } from 'react';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { Accordion } from 'components/Accordion';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { useFormik } from 'formik';
import ChangePasswordSchema from 'validations/changePassword.schema';
import { useTranslation } from 'react-i18next';
import { SettingLabelType } from 'interfaces/stringLiterals';
import { RootState } from 'reducers';
import { useDispatch, useSelector } from 'react-redux';
import { putPasswordRequest } from 'reducers/auth';
import { getFilterPropsObject } from 'utils/filterProps';
import { toast } from 'react-toastify';

interface IProps {
  expandingSettingType: SettingLabelType;
  setExpandingSettingType: (value: SettingLabelType) => void;
}

const PasswordSetting = ({
  expandingSettingType,
  setExpandingSettingType,
}: IProps) => {
  const [expanding, setExpanding] = useState<boolean>(false);

  const { updatePasswordSuccess, error } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialFormValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initialFormValues,
    validationSchema: ChangePasswordSchema,
    onSubmit: values => {
      dispatch(
        putPasswordRequest(getFilterPropsObject(values, ['confirmPassword'])),
      );
    },
  });

  useEffect(() => {
    if (expandingSettingType !== 'password') {
      setExpanding(false);
    }
  }, [expandingSettingType]);

  useEffect(() => {
    if (updatePasswordSuccess) {
      toast.success(
        t('setting.password_setting.toasts.updated_password_success'),
      );
      resetForm({ values: initialFormValues });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePasswordSuccess, resetForm, t]);

  useEffect(() => {
    if (error) {
      toast.error(t(`setting.password_setting.toasts.${error}`));
      resetForm({ values: initialFormValues });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, resetForm, t]);

  const handleToggleExpand = () => {
    if (!expanding) {
      setExpandingSettingType('password');
    }
    setExpanding(!expanding);
  };

  return (
    <Accordion
      title={t('setting.password_setting.title')}
      expanding={expanding}
      onToggleExpand={handleToggleExpand}
    >
      <form>
        <div className="flex justify-end">
          <Button
            icon={faFileImport}
            text="Save"
            size="sm"
            onClick={() => handleSubmit()}
          />
        </div>
        <div className="pb-2">
          <div className="text-gray-500">
            {t('setting.password_setting.labels.old_password')}&nbsp;*
          </div>
          <Input
            type="text"
            name="oldPassword"
            value={values.oldPassword}
            i18nErrorPath={errors.oldPassword}
            touched={touched.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
          />
        </div>
        <div className="pb-2">
          <div className="text-gray-500">
            {t('setting.password_setting.labels.new_password')}&nbsp;*
          </div>
          <Input
            type="text"
            name="newPassword"
            value={values.newPassword}
            i18nErrorPath={errors.newPassword}
            touched={touched.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
          />
        </div>
        <div className="pb-2">
          <div className="text-gray-500">
            {t('setting.password_setting.labels.confirm_password')}&nbsp;*
          </div>
          <Input
            type="text"
            name="confirmPassword"
            value={values.confirmPassword}
            i18nErrorPath={errors.confirmPassword}
            touched={touched.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
          />
        </div>
      </form>
    </Accordion>
  );
};

export default PasswordSetting;
