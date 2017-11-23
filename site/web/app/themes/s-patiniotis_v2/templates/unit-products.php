<section id="products" class="products">
<div class="container-fluid">
  <div class="row">

    <div class="col-12 test">
      <a href="#menu-toggle" class="btn btn-secondary" id="menu-toggle">Toggle Menu</a>
  Facets
  <?php   echo facetwp_display( 'facet', 'product_categories' ); ?>

</div>
</div>



products
    <?php echo facetwp_display( 'template', 'example' ); ?>
    <?php echo facetwp_display( 'pager' ); ?>
</div>
</section>
