# Snippets

For useful widgets and beautiful styling only some additional html does the trick. Below, there are custom snippets ready-to-use in your BSD template.


## two different templates

Use the "big picture" one, if you want to use a big background image, use the
default single column template with a gray background image otherwise.

NB: If you use the "big picture" template, you will **HAVE TO** include a
background image snippet (see below) into the content of your action.

## surveys

On Survey pages, the opening body tag needs the `survey` class in order for questionnaire labels to be displayed correctly.
```html
<body class="single-column survey">
```

## background image

**You will need to do this for the "big picture" template!**

Paste the background image at the top of your content.
You can change the background image on a per-action basis, there is no need to
copy and change the templates themselves.

```html
<div id="background-image"><img src="https://moreonion.github.io/shareaction-templates/images/huge_background.png" /></div>
```

The image from the design drafts is found under https://moreonion.github.io/shareaction-templates/images/huge_background.png

Prefer using `https` over `http` whereever possible.

## content seamless

Use the class `content-seamless` to let the container span over the paddings left and right.

## headline

The main heading needs the class `headline` to get the cool background.

```html
<h1 class="headline content-seamless">
  Super important headline
</h1>
```

This is meant to be at the very top of the content.
If you want to use this headline inside the form you should add the class `in-text` too:

```html
<h1 class="headline content-seamless in-text">
  Super important headline in the text
</h1>
```

## background info

```html
<a href="#background-info" class="info-toggle">More info</a>

<div id="background-info" name="background-info">
  <a class="close" aria-label="Close">&#215;</a>
  your content
</div>
```

The `info-toggle` element enables the "show more info" logic. A click on the toggle shows the target element, which has the id referenced in the toggles `href`-attribute: in this example `background-info`.

## videos

```html
<div class="video">
  Paste the embed code from youtube, vimeo, … here
</div>
```

This makes your videos responsive, so they will always fit on the screen (even on tiny mobile screens).

## progress bar (thermometer)

### for signup actions:

```html
<div class="progressbar-wrapper content-seamless">
  <div id="progressbar" data-form-id="{{ the id of the form }}" data-start-count="0">
    <div class="progress">
      <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
    </div>
    <div class="progressbar-text"><span class="counter">0</span> people have taken action already</div>
  </div>
</div>
```

You will need to set the id for `data-form-id` of the form manually. This is
required. You find it e.g. in Edit link in the admin page when you hover over
"Edit" -- look for the number after `signup_form_id`.

### for speakout actions

The progressbar for speakout actions assumes that the supporters first get to
visit the landing page and are then redirected to the form page (this is the
one you get to after clicking on the submit button on the landing page.

Thus the "Show Goals To Users" option has to be set to "Yes" (in the "Campaign
Goal Options" category). Otherwise the template will not be able to read out
the number of letters sent.

If the templates fails for some reason to read out the data on the landing
page, e.g. if it is not displayed or if the markup changes, the progressbar
will be hidden on the form page.

```html
<div class="progressbar-wrapper content-seamless">
  <div id="progressbar" data-progressbar-type="speakout" data-start-count="0">
    <div class="progress">
      <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
    </div>
    <div class="progressbar-text"><span class="counter">0</span> people have taken action already</div>
  </div>
</div>
```

This is mainly the same code, but you have to change `data-form-id` into
`data-progressbar-type` with the value `speakout`.

### Customizations

(This applys to both variations, for signup and speakout progressbars.)

If you want to change the start count of the progressbar, edit the value of
`data-start-count`. This only affects the initial loading of the progressbar.
This is not an offset added to the actual count -- after the current count is
polled, this polled value is used as-is.

Feel free to replace the default copy with a text of your own! The numbers for
`.counter` and `.target` will be updated automatically.

## share links

These are social share buttons for Facebook, Twitter and email sharing:

```html
<ul class="share-links">

  <li class="facebook">
    <a class="button" href="https://www.facebook.com/sharer.php?u={{urlencoded url}}" title="Share this via Facebook!" target="_blank" data-share="facebook">
      <i></i><span>Facebook</span>
    </a>
  </li>

  <li class="twitter">
    <a class="button" href="http://twitter.com/share?text={{urlencoded share text}}&amp;url={{urlencoded url}}" title="Share this via Twitter!" target="_blank" data-share="twitter">
      <i></i><span>Twitter</span>
    </a>
  </li>

  <li class="email">
    <a class="button" href="{{EN email share url}}" title="Share this via E-Mail!" target="_blank" data-share="email">
      <i></i><span>E-Mail</span>
    </a>
  </li>

</ul>
```

Make sure to replace the `{{placeholder parts}}` with the real urls and share texts! The name between `<span>name</span>` is what's displayed on the button itself, the `title` pops up when hovering over the button. (`<i></i>` makes space for the icon, which will be inserted automatically.)

## custom buttons

```
<a class="button" href="{{my url}}" title="This appears on hover">This is the button caption</a>
```

## Speakout campaigns

Due to how BSD pages are rendered by BSD there needs to be a little setup for each Speakout campaign.
This setup is needed for the skipping of the landing page and to get the data for the speakout campaign progress bar.

In the campaign description add the following code:

```
<div id="landing-curtain"><noscript><div>Please enable JavaScript or <a href="#">skip this site</a>.</div></noscript></div>
```

This will prevent the landing page from flickering for a fraction of a second
before the redirect can happen and will display a "warning" if the user has
JavaScript disabled.

The text inside the `<div>` is customizable.

You will have to set the URL manually, though...

### Redirection customization

You can customize the redirect with two JavaScript variables, both are *optional*:

```
<script>
window.mo_auto_redirect = true;
window.mo_redirect_url = 'https://example.com/action';
</script>
```

The default value of `window.mo_auto_redirect` is `true`, and the default value
of `window.mo_redirect_url` is the current URL, with `js=false` appendend
(setting the GET parameter to some value renders the second speakout step, the
one with the form).
