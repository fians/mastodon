import Column from '../ui/components/column';
import ColumnLink from '../ui/components/column_link';
import { Link } from 'react-router';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

const messages = defineMessages({
  heading: { id: 'getting_started.heading', defaultMessage: 'Getting started' },
  public_timeline: { id: 'navigation_bar.public_timeline', defaultMessage: 'Public timeline' },
  settings: { id: 'navigation_bar.settings', defaultMessage: 'Settings' },
  follow_requests: { id: 'navigation_bar.follow_requests', defaultMessage: 'Follow requests' }
});

const mapStateToProps = state => ({
  me: state.getIn(['accounts', state.getIn(['meta', 'me'])])
});

const hamburgerStyle = {
  background: '#373b4a',
  color: '#fff',
  fontSize: '16px',
  padding: '15px',
  position: 'absolute',
  right: '0',
  top: '-48px',
  cursor: 'default'
};

const GettingStarted = ({ intl, me }) => {
  let followRequests = '';

  if (me.get('locked')) {
    followRequests = <ColumnLink icon='users' text={intl.formatMessage(messages.follow_requests)} to='/follow_requests' />;
  }

  return (
    <Column icon='asterisk' heading={intl.formatMessage(messages.heading)}>
      <div style={{ position: 'relative' }}>
        <div style={hamburgerStyle}><i className='fa fa-bars' /></div>
        <ColumnLink icon='globe' text={intl.formatMessage(messages.public_timeline)} to='/timelines/public' />
        <ColumnLink icon='cog' text={intl.formatMessage(messages.settings)} href='/settings/profile' />
        {followRequests}
      </div>

      <div className='static-content'>
        <p><FormattedMessage id='getting_started.about_addressing' defaultMessage='You can follow people if you know their username and the domain they are on by entering an e-mail-esque address into the form at the top of the sidebar.' /></p>
        <p><FormattedMessage id='getting_started.about_shortcuts' defaultMessage='If the target user is on the same domain as you, just the username will work. The same rule applies to mentioning people in statuses.' /></p>
        <p><FormattedMessage id='getting_started.about_developer' defaultMessage='The developer of this project can be followed as Gargron@mastodon.social' /></p>
      </div>

      <div className='getting-started__illustration' />
    </Column>
  );
};

GettingStarted.propTypes = {
  intl: React.PropTypes.object.isRequired,
  me: ImmutablePropTypes.map.isRequired
};

export default connect(mapStateToProps)(injectIntl(GettingStarted));
