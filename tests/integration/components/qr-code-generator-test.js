import { module, test } from 'qunit';
import { setupRenderingTest } from 'qr-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | qr-code-generator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<QrCodeGenerator />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <QrCodeGenerator>
        template block text
      </QrCodeGenerator>
    `);

    assert.dom().hasText('template block text');
  });
});
