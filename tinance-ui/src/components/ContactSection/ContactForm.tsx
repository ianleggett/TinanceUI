import React, { Component } from "react";

// type MyForm = React.RefObject<{
//   ref: MyForm,
//   reset: () => void
// }>

type ContactFormProps = {

}

class ContactForm extends Component<ContactFormProps> {
  constructor(props) {
    super(props)
    this.myForm = React.createRef()
  }
  myForm;

  state = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  changHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitHangler = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.myForm.current.reset()
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    console.log(this.state)
  }

  render() {
    return (
      <div className="contact-box text-center">
        <form
          ref={this.myForm}
          onSubmit={this.submitHangler}
          className="contact-form"
          noValidate={true}
        >
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                required={true}
                onChange={this.changHandler}
                value={this.state.name}
                />
              </div>
              <div className="form-group">
                <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                required={true}
                onChange={this.changHandler}
                value={this.state.email}
                />
              </div>
              <div className="form-group">
                <input
                type="text"
                className="form-control"
                name="subject"
                placeholder="Subject"
                required={true}
                onChange={this.changHandler}
                value={this.state.subject}
                />
              </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    required={true}
                    onChange={this.changHandler}
                    value={this.state.message}
                    />
                </div>
            </div>
            <div className="col-12">
                <button
                    type="submit"
                    className="btn btn-lg btn-block mt-3"><span className="text-white pr-3"><i className="fas fa-paper-plane" /></span>
                    Send Message
                </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;