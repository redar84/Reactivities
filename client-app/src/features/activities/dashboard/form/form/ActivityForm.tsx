import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../../../app/common/form/TextInput';
import TextAreaInput from '../../../../../app/common/form/TextAreaInput';
import SelectInput from '../../../../../app/common/form/SelectInput';
import { category } from '../options/CategoryOptions';
import DateInput from '../../../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired({ message: 'The event category is required' }),
    description: composeValidators(
        isRequired('description'),
        hasLengthGreaterThan(4)({ message: 'Descritption needs to be at least five chatacteres' })
    )(),
    city: isRequired('City'),
    venue: isRequired('venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
})
interface DetailsParams {
    id: string
}
const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { editActivity, createActivity, submitting,
        loadActivity } = activityStore
    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadActivity(match.params.id)
                .then((activity) => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false))
        }

    }, [loadActivity, match.params.id])



    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time)
        console.log(dateAndTime);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;

        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }

            createActivity(newActivity)
                .then(() => history.push(`/activities/${newActivity.id}`));


        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`))

        }


    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing >
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    row={3}
                                    name="description"
                                    placeholder="Description"
                                    value={activity.description}
                                    component={TextAreaInput} />
                                <Field
                                    name="category"
                                    placeholder="Category"
                                    options={category}
                                    value={activity.category}
                                    component={SelectInput} />
                                <Form.Group widths='equal'>
                                    <Field
                                        component={DateInput}
                                        name='date'
                                        date={true}
                                        placeholder='Date'
                                        value={activity.date}
                                    />
                                    <Field
                                        component={DateInput}
                                        name='time'
                                        time={true}
                                        placeholder='Time'
                                        value={activity.time}
                                    />
                                </Form.Group>

                                <Field
                                    name="venue"
                                    placeholder="Venue"
                                    value={activity.venue}
                                    component={TextInput} />
                                <Field
                                    name="city"
                                    placeholder="City"
                                    value={activity.city}
                                    component={TextInput} />
                                <Button content="Submit"
                                    floated="right"
                                    positive type="submit"
                                    loading={submitting}
                                    disabled={loading || invalid || pristine}
                                />
                                <Button
                                    onClick={
                                        activity.id
                                            ? () => history.push(`/activities/${activity.id}`)
                                            : () => history.push('/activities')
                                    }
                                    disabled={loading}
                                    floated='right'
                                    type='button'
                                    content='Cancel'
                                />
                            </Form>)}
                    />

                </Segment>
            </Grid.Column>
        </Grid>

    );
};

export default observer(ActivityForm);