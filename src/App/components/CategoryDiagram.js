import React, {Component} from 'react';
import Chart from 'react-apexcharts'

class CategoryDiagram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {labels: this.props.labels,
                legend: {floating: true}
            },
            series: this.props.percents,
        }
    }

    static getDerivedStateFromProps(props) {
        return (
            {"options": {"labels": props.labels,
                    "legend": {"floating": true}
                    },
                "series": props.percents}
        );
    }

    render() {
        return (
            <div className="donut" >
                <Chart options={this.state.options} series={this.state.series} type="donut" width="380"/>
            </div>
        );
    }
}

export default CategoryDiagram;