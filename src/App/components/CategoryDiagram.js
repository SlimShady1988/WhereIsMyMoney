import React, {Component, useState} from 'react';
import Chart from 'react-apexcharts'

// const CategoryDiagram = observer((props) => {
//         const [options, setOptions] = useState({});
//         const [series, setSeries] = useState([44, 55, 41, 17, 15]);
//         const [labels, setLabels] = useState(['A', 'B', 'C', 'D', 'E']);
//         const [seriesMixedChart, setSeriesMixedChart] = useState(
//         {
//             name: "series-1",
//             type: "line",
//             data: [30, 40, 25, 50, 49, 21, 70, 51]
//         },
//         {
//             name: "series-2",
//             type: "column",
//             data: [23, 12, 54, 61, 32, 56, 81, 19]
//         },
//         {
//             name: "series-3",
//             type: "column",
//             data: [62, 12, 45, 55, 76, 41, 23, 43]
//         }
//         )
//
//     console.log(super.props)
//     // {
//
//         // const newSeries = [];
//
//         // this.state.series.map((s) => {
//         //     const data = s.data.map(() => {
//         //         return Math.floor(Math.random() * (180 - min + 1)) + min
//         //     })
//         //     newSeries.push({data, name: s.name})
//         // })
//
//         // this.setState({
//         //     series: newSeries
//         // })
//
//     // }
//         return (
//             <div className="donut">
//                 <Chart options={options} series={series} type="donut" width="380" />
//             </div>
//         );
// });


class CategoryDiagram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {labels: this.props.labels},
            series: this.props.percents,
        }
    }

    render() {

        // const newSeries = [];
        //
        // this.state.series.map((s) => {
        //     const data = s.data.map(() => {
        //         return Math.floor(Math.random() * (180 - min + 1)) + min
        //     })
        //     newSeries.push({ data, name: s.name })
        // })
        //
        // this.setState({
        //     series: newSeries
        // })

        return (
            <div className="donut">
                <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
            </div>
        );
    }
}

export default CategoryDiagram;