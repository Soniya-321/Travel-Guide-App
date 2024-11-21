import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {
    apiStatus: apiConstants.initial,
    packagesList: [],
  }

  componentDidMount() {
    this.getTravelPlaces()
  }

  getTravelPlaces = async () => {
    this.setState({apiStatus: apiConstants.in_progress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.packages.map(each => ({
        id: each.id,
        description: each.description,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({
        packagesList: updatedData,
        apiStatus: apiConstants.success,
      })
    }
  }

  renderLoaderView = () => {
    return (
      <div data-testid="loader" className="loader-container">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  renderPackagesView = () => {
    const {packagesList} = this.state
    return (
      <ul>
        {packagesList.map(each => (
          <li key={each.id}>
            <img src={each.imageUrl} alt={each.name} className="img" />
            <h1>{each.name}</h1>
            <p>{each.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderPackagesView()
      case apiConstants.in_progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {this.renderAllViews()}
      </div>
    )
  }
}

export default TravelGuide
