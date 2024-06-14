import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { editChannelAction, fetchChannelAction } from '../../store/api-action/chat-api-action.js';
import {
  getDropMenuChannelId,
  getDropMenuChannelName,
  getIsEditingChannel,
} from '../../store/ui-setting/ui-setting.selector.js';
import {
  resetActiveChannel,
  resetDropMenuChannel,
  setIsEditingChannel,
} from '../../store/ui-setting/ui-setting.slice.js';
import { channelCreateValidationSchema } from '../channel-create/channel-create-validation-schema.js';

// eslint-disable-next-line import/prefer-default-export
export const ChannelEdit = () => {
  const dispatch = useDispatch();

  const isEditingChannel = useSelector(getIsEditingChannel);
  const dropMenuChannelId = useSelector(getDropMenuChannelId);
  const dropMenuChannelName = useSelector(getDropMenuChannelName);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingChannel]);

  if (!isEditingChannel || !dropMenuChannelId) {
    return null;
  }

  const initialValues = {
    name: dropMenuChannelName,
  };

  function handleCloseClick() {
    dispatch(setIsEditingChannel(false));
  }

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const resultAction = await dispatch(editChannelAction({
        id: dropMenuChannelId, name: values.name,
      }));
      unwrapResult(resultAction);
      toast.success('Канал переименован', {
        position: 'top-right',
      });
      dispatch(resetActiveChannel());
      dispatch(resetDropMenuChannel());
      dispatch(setIsEditingChannel(false));
      dispatch(fetchChannelAction());
    } catch (error) {
      toast.error(`Edit channel '${dropMenuChannelName}' failed. Please try again.`, {
        position: 'top-right',
      });
      setFieldError('name', 'Неверное имя канала');
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div
        role="dialog"
        aria-modal="true"
        style={{ display: 'block' }}
        className="fade modal show"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{`Изменить канал '${dropMenuChannelName}'`}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={handleCloseClick}
              />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                validationSchema={channelCreateValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="">
                    <div>
                      <Field
                        name="name"
                        id="name"
                        innerRef={inputRef}
                        className={classNames('mb-2 form-control', { 'is-invalid': errors.name && touched.name })}
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label
                        className="visually-hidden"
                        htmlFor="name"
                      >
                        Имя канала
                      </label>
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="me-2 btn btn-primary"
                          disabled={isSubmitting}
                        >
                          Переименовать
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCloseClick}
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
