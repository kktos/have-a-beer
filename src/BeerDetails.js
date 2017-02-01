/*
  The detailed information of the selected beer
  - gets from store the beer data and displays it
*/

import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';

class BeerDetails extends React.Component {

    constructor (props) {
        super(props);
        this.hops= null;
        this.foods= null;
        this.state= {
            data: {
                name: '', tagline: '', description: ''
            } 
        };

        this.loadData();

    }

    /*
    a bit of a nightmare dealing with react and css and material. 'twas a tad easier with Angular
    so no fancy stuff here... a pity :/
     */
    loadData() {
        const id= this.props.params.id;
        const store= global.app.get('BeerStore');
        store.getByID(id)
            .then(data => {
                this.hops= data.ingredients.hops.map((hop, idx) => ( 
                    <span key={ idx }>
                        { hop.name+' ('+hop.attribute+')' } : { hop.amount.value+' '+hop.amount.unit }, &nbsp; 
                    </span>
                ));

                this.foods= data.food_pairing.map((food, idx) => ( 
                    <span key={ idx }>
                        { food }, &nbsp;
                    </span>
                ));

                this.setState({data});
            });
    }

    render() {
        const beerData= this.state.data;

        /* 
        The back-to-the-beer-list button works...ok.. can't find a better way
        but man, that's awful !!! to avoid at all costs !!!
        */

        return <Card style={{ margin:10, flexGrow: 1 }}>
            <CardTitle title={beerData.name} subtitle={ beerData.tagline } />
            <CardText style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 200px', textAlign: 'center' }}><img src={ beerData.image_url } role="presentation" style={{ width:'50%' }}/></div>
                <div style={{ flex: 1 }}>
                    { beerData.description }
                    { beerData.brewers_tips && 
                        <div> 
                            <h4>Brewer Tips</h4>
                            { beerData.brewers_tips }
                        </div>
                    }
                    { this.hops && 
                        <div> 
                            <h4>Hops</h4>
                             { this.hops }
                        </div>
                    }
                    { this.foods && 
                        <div> 
                            <h4>Food Pairing</h4>
                            { this.foods }
                        </div>
                    }
                </div>
            </CardText>
            <CardActions>
                <Toolbar style={{justifyContent: "space-around"}} >
                    <ToolbarGroup lastChild={true}>
                        <FlatButton label="close" onClick={ ()=>browserHistory.push('/beers') }  />
                    </ToolbarGroup>
                </Toolbar>
            </CardActions>
        </Card>
    }
}

export default BeerDetails;