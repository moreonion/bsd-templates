# Snippets

For useful widgets and beautiful styling only some additional html does the trick. Below, there are custom snippets ready-to-use in your BSD template.


## background image

```html
<div id="background-image"><img src="/images/relaxing2.jpg" /></div>
```

## content seamless

Use the class `content-seamless` to let the container span over the paddings left and right.

## headline

The main heading needs the class `headline` to get the cool background.

```html
<h1 class="headline content-seamless">
  Super important headline
</h1>

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

```html
<div class="pgbar-thermometer line-after" data-target="250" data-start="0">
  <div class="t_body">
    <div class="t_level"></div>
  </div>
  <p><span class="t_current">0</span> people have taken action already</p>
</div>
```

Feel free to replace the default copy with a text of your own! The numbers for `.t_current` and `.t_target` will be updated automatically.

To set a new target, change the value for `data-target`. Change `data-start` to add an initial value, e.g. offline supporters. If the data-attributes are missing, the default values shown above will be used instead.

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
