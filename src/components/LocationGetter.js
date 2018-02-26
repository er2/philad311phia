import React, { Component } from 'react';

class LocationGetter extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      query: '',
      data: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({ query: event.target.value });
  };

  handleSubmit(event) {
    let zip = this.state.query;
    this.setState ({ isLoading: true})
    event.preventDefault();

     fetch(`https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20public_cases_fc%20WHERE%20zipcode%20=%20%27${zip}%27%20AND%20media_url%20NOT%20LIKE%20%27%27%20LIMIT%203`)
      .then(response => {
        if (response.ok) { return response.json() }
      })
      .then(data => {
        console.log(data.rows)
        this.setState ({ data: data.rows})
        this.setState ({ isLoading: false})
      });
  };

  render() {
    if (this.state.isLoading) return <div className="loading">loading...</div>
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          <span>Philly Zip code pls:</span>
          <input type="text" value={this.state.query} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <ul>
          {
            this.state.data.map((item, index) =>
            <div key={index} className="container app-entry">
              <div className="row">
                <div className="column">
                  <img src={item.media_url} alt="media url"/>
                </div>
                <div className="column entry-info">
                  <p>Service Request ID: {item.service_request_id}</p>
                  <p>Address: {item.address}, {item.zipcode}</p>
                  <p>Service name: {item.service_name}
                     (code: {item.service_code})</p>
                  <p>Agency Responsible: {item.agency_responsible}</p>
                  <p>Date Requested: {item.requested_datetime.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}</p>
                  <p>Date Expected: {item.expected_datetime.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}</p>
                  <p>Last Updated: {item.updated_datetime.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}</p>
                  <p>Status: {item.status}</p>
                  <p>Status Notes: {item.status_notes}</p>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
    )
  };
};

export default LocationGetter;
