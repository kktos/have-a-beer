/*
  The paginated list of beers
  - gets from store a chunk of beers and displays it
  - manage the pagination
  - repost the 'isLoading' state to its parent
*/
import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Badge from 'material-ui/Badge';
import Link from 'react-router/lib/Link';

const wannaDisplayPage= false;

class BeerTable extends React.Component {

  constructor (props) {
    super(props);
    this.state= { page: 0, data: [] };
    this.store= global.app.get('BeerStore');
  }

  componentWillMount= () => this.load(+1);

  load(pageInc) {
    const { onLoad }= this.props.route;
    onLoad(true);
    this.store.getPage(this.state.page+pageInc)
      .then( data=> {
          this.setState({ page: this.state.page + pageInc, data });
          onLoad(false);
        });
  }

  prevPage= () => this.load(-1);
  nextPage= () => this.load(+1);

  render() {
    var rows= this.state.data.map(beer => (
          <TableRow key={beer.id}>
            <TableRowColumn><Link to={`/beers/${beer.id}`}>{beer.name}</Link></TableRowColumn>
            <TableRowColumn>{beer.tagline}</TableRowColumn>
            <TableRowColumn>{beer.first_brewed}</TableRowColumn>
          </TableRow>
        )
    );
    return (
      <Card style={{ margin:10 }}>
        <CardText>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>First Brewed</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} displayRowCheckbox={false}>
              {rows}
            </TableBody>
        
          </Table>
        </CardText>
        <CardActions>
          <Toolbar style={{justifyContent: "flex-end"}} >
            <ToolbarGroup lastChild={true}>
              {wannaDisplayPage &&
                <Badge badgeContent={this.state.page} />
              }
              {this.state.page > 1 &&
                <FlatButton icon={<ChevronLeft />} onClick={() => this.prevPage()} />
              }
              <FlatButton icon={<ChevronRight />} onClick={() => this.nextPage()}  />
            </ToolbarGroup>
          </Toolbar>
        </CardActions>
    </Card>
    );
  }
}

export default BeerTable;