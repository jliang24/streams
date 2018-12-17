import React from 'react'; 
import { Field, reduxForm } from 'redux-form'; 

class StreamForm extends React.Component {
  renderError({error, touched}){
    if (touched && error) {
      return (
        <div className="ui error message">
          <div>{error}</div>
        </div>
      )
    }
  }

  renderInput = ({input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? 'error':''}`;
    const styleColor = meta.error && meta.touched ? {color:"orangered"} : {}; 
    return (
      <div className={className}>
        <label style={styleColor}>{label}</label>
        <input {...input}/>
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render(){
    return (
      <div className="ui inverted segment">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui inverted form error">
          <div className="field">
            <Field name="title" component={this.renderInput} label="Enter Title" />
          </div>
          <div className="field">
            <Field name="description" component={this.renderInput} label="Enter Description"/>
          </div>
          <button className="ui submit button">Submit</button>
        </form>
      </div>
    )
  }
}

const validate = (formValues) => {
  const errors= {};

  if (!formValues.title){
    errors.title = 'You must enter a title'; 
  }

  if(!formValues.description){
    errors.description = 'You must enter a description'
  }

  return errors; 
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm); 